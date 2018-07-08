/*
  The reducer is a pure function that takes the previous state and an action, and returns the next state.
*/

import { combineReducers } from 'redux'

import {
  FETCH_CONTACTS,
  FETCH_CONTACTS_COMMIT,
  FETCH_CONTACTS_ROLLBACK,
  ADD_CONTACT,
  ADD_CONTACT_COMMIT,
  ADD_CONTACT_ROLLBACK,
  EDIT_CONTACT,
  EDIT_CONTACT_COMMIT,
  EDIT_CONTACT_ROLLBACK,
  REMOVE_CONTACT,
  REMOVE_CONTACT_COMMIT,
  REMOVE_CONTACT_ROLLBACK,
  TOGGLE_EDIT
} from './actions'

const isTemp = (id, payload) => {
  return id.startsWith('tmp') && id.substring(4) === payload.id
}
const initialEditView = {
  isOpen: false,
  contact: {
    name: '',
    email: '',
    phone: ''
  }
}

// toggles the edit / listview and loads contact
function editView (state = initialEditView, action) {
  switch (action.type) {
    case TOGGLE_EDIT:
      let contact = {
        name: '',
        email: '',
        phone: ''
      }
      if (action.contact) {
        contact = action.contact
      }

      return {
        ...state,
        isOpen: !state.isOpen,
        contact
      }
    default:
      return state
  }
}

// TODO? see https://hackernoon.com/redux-patterns-add-edit-remove-objects-in-an-array-6ee70cab2456
function contacts (state = [], action) {
  switch (action.type) {
    case FETCH_CONTACTS:
      console.log('started to fetch contacts ')
      // nothing to show
      return state

    case FETCH_CONTACTS_COMMIT:
      console.log('successfully fetched contacts ')

      // need to check if local state and Api is in sync
      // remove data from local if it doesnt exist in backend
      // if (state === action.payload) return state
      return action.payload

    case FETCH_CONTACTS_ROLLBACK:
      console.log('failed to fetch contacts', action)
      return state

    case ADD_CONTACT:
      console.log('started to add contact ', action.contact.name)

      // update UI temporary
      // Since each contact item must have a unique key,
      // so create a temp Id here – the tempId will be replace by real ID from API later
      const tmpContact = {
        ...action.contact,
        id: new Date().toISOString(),
        isTemp: true
      }
      return [...state, tmpContact]

    case ADD_CONTACT_COMMIT:
      console.log('successfully added contact ', action.payload.name)
      // TODO: contact === action.payload?
      return state.map(contact => {
        if (isTemp(contact.id, action.payload.contact)) {
          return {
            ...contact,
            // replace the temp ID by real ID from API, so we know this is not in sync
            id: action.payload.id,
            isTemp: false
          }
        }
        return contact
      })

    case ADD_CONTACT_ROLLBACK:
      console.log('failed to add contact', action.meta.contact.name)
      // return state without temporary contact?
      return state.filter(contact => isTemp(contact.id, action.meta.contact))

    case EDIT_CONTACT:
      console.log('started to edit contact', action.contact.name)

      return state.map(contact => {
        if (contact.id === action.contact.id) {
          // replace real id with temp ID, so we know this is not in sync
          return {
            ...action.contact,
            id: 'tmp-' + action.contact.id,
            isTemp: true
          }
        }
        return contact
      })

    case EDIT_CONTACT_COMMIT:
      // TODO: contact === action.payload?
      return state.map(contact => {
        // replace the temp ID by real ID from API
        if (isTemp(contact.id, action.payload.contact)) {
          return {
            ...action.payload.contact,
            isTemp: false
          }
        }
        return contact
      })

    case EDIT_CONTACT_ROLLBACK:
      console.log('failed to edit contact', action.meta.contact.name)
      return state.filter(contact => isTemp(contact.id, action.meta.contact))

    case REMOVE_CONTACT:
      console.log('started to remove contact', action.contact.name)

      // set isDeleting flag
      state.map(contact => {
        if (contact.id === action.contact.id) {
          return {
            ...contact,
            isDeleting: true
          }
        } else {
          return contact
        }
      })
      // and remove from local state?
      return state.filter(contact => contact.id !== action.contact.id)

    case REMOVE_CONTACT_COMMIT:
      // TODO: contact === action.payload?
      // return all the items not matching the action.id
      console.log('### contact removed successfully', action)
      return state.filter(contact => contact.id !== action.payload.contact.id)

    case REMOVE_CONTACT_ROLLBACK:
      console.log('failed to remove contact', action.meta.contact.name)
      // revert deleting
      return state.map(contact => {
        if (contact.id === action.meta.contact.id) {
          delete contact.isDeleting
        }
        return contact
      })

    default:
      return state
  }
}

const contactApp = combineReducers({
  editView,
  contacts
})

export default contactApp
