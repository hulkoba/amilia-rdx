import { combineReducers } from 'redux'

import {
  ADD_CONTACT,
  EDIT_CONTACT,
  // REMOVE_CONTACT,
  // FETCH_CONTACTS,
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

function contacts (state = initialState.contacts, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return Object.assign({}, state, {
        contacts: [
          ...state.contacts,
          action.contact
        ]
      })
    case EDIT_CONTACT:
      return Object.assign({}, state, {
        contacts: [
          ...state.contacts,
          {
            name: action.name,
            phone: action.phone,
            mail: action.mail
          }
        ]
      })
    // case REMOVE_CONTACT:
    //   return Object.assign({}, state, {
    //     contacts: action.filter
    //   })
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
