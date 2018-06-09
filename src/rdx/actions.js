/*
 * action types
 */
export const ADD_CONTACT = 'ADD_CONTACT'
export const FETCH_CONTACTS = 'FETCH_CONTACTS'
export const FETCH_CONTACTS_COMMIT = 'FETCH_CONTACTS_COMMIT'
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
// Decorate actions with offline metadata
export function addContact (contact) {
  return {
    type: ADD_CONTACT,
    contact
  }
}

export function readContacts () {
  const API = 'http://127.0.0.1:1312'
  return {
    type: FETCH_CONTACTS,
    // contacts,
    meta: {
      offline: {
        // the network action to execute:
        effect: { url: `${API}/contacts` },
        // effect: { url: '/api/follow', method: 'POST', body: JSON.stringify({ contact }) },
        // action to dispatch when effect  has been successfully sent:
        commit: { type: 'FETCH_CONTACTS_COMMIT' }
        // action to dispatch if network action fails permanently (does not count network-related failures, which will be automatically retried):
        // rollback: { type: 'FETCH_CONTACTS_ROLLBACK', meta: { contact } }
      }
    }
  }
}

export function editContact (contact) {
  return { type: EDIT_CONTACT, contact }
}

export function removeContact (contact) {
  return { type: REMOVE_CONTACT, contact }
}
