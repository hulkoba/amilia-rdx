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

// The reducer is a pure function that takes the previous state and an action, and returns the next state.

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
      return state

    case FETCH_CONTACTS_COMMIT:
      console.log('### state', state)
      console.log('### action', action)
      return Object.assign([], state, action.payload)

    case FETCH_CONTACTS_ROLLBACK:
      console.log('failed to fetch contacts', action)
      return state

    default:
      return state
  }
}

function addContact (state = [], action) {
  switch (action.type) {
    case ADD_CONTACT:
      console.log('started to add contact ', action.contact.name)
      // TODO update UI

      return state

    case ADD_CONTACT_COMMIT:
      return [...state, action.payload]

    case ADD_CONTACT_ROLLBACK:
      console.log('failed to add contact', action.meta.contact.name)
      return state

    default:
      return state
  }
}

function editContact (state = [], action) {
  switch (action.type) {
    case EDIT_CONTACT:
      console.log('started to edit contact', action.contact.name)
      // TODO update UI

      return state

    case EDIT_CONTACT_COMMIT:
      // find and replace contact
      return state.map(c => {
        if (c.id === action.payload.id) return action.payload
        return c
      })

    case EDIT_CONTACT_ROLLBACK:
      console.log('failed to edit contact', action.meta.contact.name)
      return state

    default:
      return state
  }
}

function removeContact (state = [], action) {
  switch (action.type) {
    case REMOVE_CONTACT:
      console.log('started to remove contact', action.contact.name)
      // TODO update UI
      return state

    case REMOVE_CONTACT_COMMIT:
      // return all the items not matching the action.id
      return state.filter(c => c.id !== action.payload.id)

    case REMOVE_CONTACT_ROLLBACK:
      console.log('failed to remove contact', action.meta.contact.name)
      return state

    default:
      return state
  }
}

const contactApp = combineReducers({
  editView,
  contacts,
  addContact,
  editContact,
  removeContact
})

export default contactApp
