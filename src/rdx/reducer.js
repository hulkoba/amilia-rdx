import { combineReducers } from 'redux'

import {
  ADD_CONTACT,
  EDIT_CONTACT,
  // REMOVE_CONTACT,
  // READ_CONTACTS,
  TOGGLE_EDIT
} from './actions'

// The reducer is a pure function that takes the previous state and an action, and returns the next state.

function toggleEditView (state = TOGGLE_EDIT, action) {
  switch (action.type) {
    case TOGGLE_EDIT:
      return Object.assign({}, state, {
        editView: !state.editView
      })
    default:
      return state
  }
}

function contacts (state = [], action) {
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
    // case READ_CONTACTS:
    //   return Object.assign({}, state, {
    //     contacts: action.filter
    //   })
    default:
      return state
  }
}

const contactApp = combineReducers({
  toggleEditView,
  contacts
})

export default contactApp
