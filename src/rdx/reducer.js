import { combineReducers } from 'redux'

import {
  FETCH_CONTACTS,
  FETCH_CONTACTS_COMMIT,
  ADD_CONTACT,
  EDIT_CONTACT,
  REMOVE_CONTACT,
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

function editView (state = initialEditView, action) {
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
      // return Object.assign({}, state, {
      //   isOpen: !state.isOpen,
      //   contact
      // })
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

    case FETCH_CONTACTS:
      // console.log('### FETCH_CONTACTS state', state)
      // console.log('### FETCH_CONTACTS action', action)
      return state
      // return {...state}
    case FETCH_CONTACTS_COMMIT:
      // console.log('### FETCH_CONTACTS-COMMIT action', action)
      // console.log([ ...state, ...action.payload ])
      // const newContacts = {contacts: action.payload}
      // return [
      //   ...state,
      //   newContacts
      // ]
      return action.payload

    default:
      return state
  }
}
// optimistically update the state, revert on rollback
// const ordersReducer = (state, action) {
// switch (action.type) {
//   case 'COMPLETE_ORDER':
//     return {
//       ...state,
//       submitting: { ...state.submitting, [action.payload.orderId]: true }
//     };
//   case 'COMPLETE_ORDER_COMMIT':
//     return {
//       ...state,
//       receipts: { ...state.receipts, [action.meta.orderId]: action.payload },
//       submitting: omit(state.submitting, [action.meta.orderId])
//     };
//   case 'COMPLETE_ORDER_ROLLBACK':
//     return {
//       ...state,
//       error: action.payload,
//       submitting: omit(state.submitting, [action.meta.orderId])
//     };
//   default:
//     return state;
// }

const contactApp = combineReducers({
  editView,
  contacts
})

export default contactApp
