const fs = require('fs')

const contacts = require('./contacts.json')

async function write (newContacts) {
  const json = JSON.stringify(newContacts, null, 2)
  await fs.writeFile('utils/contacts.json', json, 'utf8', function (err) {
    if (err) throw err
    console.log('complete')
  })
}

async function addToFile (contact) {
  contacts.push(contact)
  await write(contacts)
}

async function updateFile (contact) {
  const newContacts = contacts.map(c => {
    if (c.id === contact.id) return contact
    return c
  })
  await write(newContacts)
}

async function removeFromFile (id) {
  // write all the items not matching the contact.id
  const newContacts = contacts.filter(c => c.id !== id)
  await write(newContacts)
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
