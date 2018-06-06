/*
 * action types
 */
const ADD_CONTACT = 'ADD_CONTACT'
const READ_CONTACTS = 'READ_CONTACTS'
const EDIT_CONTACT = 'EDIT_CONTACT'
const REMOVE_CONTACT = 'REMOVE_CONTACT'
const TOGGLE_EDIT = 'TOGGLE_EDIT'

/*
 * action creators
 */
export function toggleEdit (view) {
  return { type: TOGGLE_EDIT, view }
}

export function addContact (contact) {
  return { type: ADD_CONTACT, contact }
}

export function readContacts () {
  return { type: READ_CONTACTS }
}

export function editContact (contact) {
  return { type: EDIT_CONTACT, contact }
}

export function removeContact (contact) {
  return { type: REMOVE_CONTACT, contact }
}
