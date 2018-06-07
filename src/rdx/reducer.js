import { combineReducers } from 'redux'

import {
  // FETCH_CONTACTS,
  ADD_CONTACT,
  EDIT_CONTACT,
  REMOVE_CONTACT,
  TOGGLE_EDIT
} from './actions'

// The reducer is a pure function that takes the previous state and an action, and returns the next state.
const initialState = {
  editView: {
    isOpen: false,
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  },
  contacts: [{
    name: 'Amilia Pond',
    id: 11,
    email: 'amilia@pond.com',
    phone: '34567899876'
  }, {
    name: 'Doctor Who',
    id: 22,
    email: 'doctor@who.com',
    phone: '34567899876'
  }]
}

function editView (state = initialState.editView, action) {
  switch (action.type) {
    case TOGGLE_EDIT:
      let contact = {
        name: '',
        email: '',
        phone: ''
      }
      if (typeof action.contact !== 'undefined') {
        contact = action.contact
      }
      return Object.assign({}, state, {
        isOpen: !state.isOpen,
        contact
      })
    default:
      return state
  }
}

// TODO? see https://hackernoon.com/redux-patterns-add-edit-remove-objects-in-an-array-6ee70cab2456
function contacts (state = initialState.contacts, action) {
  switch (action.type) {
    case ADD_CONTACT:
      let newContact = action.contact
      newContact.id = new Date().toISOString()

      return [...state, newContact]

    case EDIT_CONTACT:
      // find and replace contact
      return state.map(c => {
        if (c.id === action.contact.id) return action.contact
        return c
      })

    case REMOVE_CONTACT:
      // return all the items not matching the action.id
      return state.filter(c => c.id !== action.contact.id)

    // case FETCH_CONTACTS:
    //   return Object.assign({}, state, {
    //     contacts: action.filter
    //   })
    default:
      return state
  }
}

const contactApp = combineReducers({
  editView,
  contacts
})

export default contactApp
