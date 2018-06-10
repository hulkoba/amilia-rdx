const fs = require('fs')

const contacts = require('./contacts.json')

function write (newContacts) {
  const json = JSON.stringify(newContacts, null, 2)
  fs.writeFile('utils/contacts.json', json, 'utf8', function (err) {
    if (err) throw err
    console.log('complete')
  })
}

function addToFile (contact) {
  contacts.push(contact)
  write(contacts)
}

function updateFile (contact) {
  const newContacts = contacts.map(c => {
    if (c.id === contact.id) return contact
    return c
  })
  write(newContacts)
}

function removeFromFile (id) {
  // write all the items not matching the contact.id
  const newContacts = contacts.filter(c => c.id !== id)
  write(newContacts)
}

async function getContacts () {
  return contacts
}

module.exports = {
  getContacts,
  addToFile,
  updateFile,
  removeFromFile
}
