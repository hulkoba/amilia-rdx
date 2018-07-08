/*
 * action types
 */
export const ADD_CONTACT = 'ADD_CONTACT'
export const ADD_CONTACT_COMMIT = 'ADD_CONTACT_COMMIT'
export const ADD_CONTACT_ROLLBACK = 'ADD_CONTACT_ROLLBACK'
export const FETCH_CONTACTS = 'FETCH_CONTACTS'
export const FETCH_CONTACTS_COMMIT = 'FETCH_CONTACTS_COMMIT'
export const FETCH_CONTACTS_ROLLBACK = 'FETCH_CONTACTS_ROLLBACK'
export const EDIT_CONTACT = 'EDIT_CONTACT'
export const EDIT_CONTACT_COMMIT = 'EDIT_CONTACT_COMMIT'
export const EDIT_CONTACT_ROLLBACK = 'EDIT_CONTACT_ROLLBACK'
export const REMOVE_TMP_CONTACT = 'REMOVE_TMP_CONTACT'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'
export const REMOVE_CONTACT_COMMIT = 'REMOVE_CONTACT_COMMIT'
export const REMOVE_CONTACT_ROLLBACK = 'REMOVE_CONTACT_ROLLBACK'
export const TOGGLE_EDIT = 'TOGGLE_EDIT'

/*
 * action creators
*/

// toggles edit- / listview and passes contact
export function toggleEdit (contact) {
  if (!contact) return { type: TOGGLE_EDIT }
  return {
    type: TOGGLE_EDIT,
    contact
  }
}

const API = 'http://127.0.0.1:1312'

/* Decorate actions with offline metadata
    effect: the network action to execute
    commit: action to dispatch when effect has been successfully sent
    rollback: action to dispatch if network action fails permanently
    (does not count network-related failures, which will be automatically retried)
      - is dispatched when API is failed.
      It means the API returns status code 500 or server doesn’t work.
      - When network is too slow or not stable,
      redux-offline will try to call API few times before dispatch ..._ROLLBACK.
*/
export function addContact (contact) {
  return {
    type: ADD_CONTACT,
    contact,
    meta: {
      offline: {
        effect: { url: `${API}/contacts`, method: 'POST', body: JSON.stringify(contact) },
        commit: { type: 'ADD_CONTACT_COMMIT', meta: { contact } },
        rollback: { type: 'ADD_CONTACT_ROLLBACK', meta: { contact } }
      }
    }
  }
}

export function readContacts () {
  return {
    type: FETCH_CONTACTS,
    meta: {
      offline: {
        effect: { url: `${API}/contacts` },
        commit: { type: 'FETCH_CONTACTS_COMMIT' },
        rollback: { type: 'FETCH_CONTACTS_ROLLBACK' }
      }
    }
  }
}

export function editContact (contact) {
  return { type: EDIT_CONTACT,
    contact,
    meta: {
      offline: {
        effect: { url: `${API}/contacts/${contact.id}`, method: 'PUT', body: JSON.stringify({ contact }) },
        commit: { type: 'EDIT_CONTACT_COMMIT', meta: { contact } },
        rollback: { type: 'EDIT_CONTACT_ROLLBACK', meta: { contact } }
      }
    }
  }
}

export function removeContact (contact) {
  return {
    type: REMOVE_CONTACT,
    contact,
    meta: {
      offline: {
        effect: { url: `${API}/contacts/${contact.id}`, method: 'DELETE' },
        commit: { type: 'REMOVE_CONTACT_COMMIT', meta: { contact } },
        rollback: { type: 'REMOVE_CONTACT_ROLLBACK', meta: { contact } }
      }
    }
  }
}
