/*
 * action types
 */
export const ADD_CONTACT = 'ADD_CONTACT'
export const FETCH_CONTACTS = 'FETCH_CONTACTS'
export const EDIT_CONTACT = 'EDIT_CONTACT'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'
export const TOGGLE_EDIT = 'TOGGLE_EDIT'

/*
 * action creators
 */
export function toggleEdit (contact) {
  return {
    type: TOGGLE_EDIT,
    contact
  }
}

export function addContact (contact) {
  console.log('### add contact', contact)
  return { type: ADD_CONTACT, contact }
}

export function readContacts () {
  return { type: FETCH_CONTACTS }
}

export function editContact (contact) {
  return { type: EDIT_CONTACT, contact }
}

export function removeContact (contact) {
  return { type: REMOVE_CONTACT, contact }
}
