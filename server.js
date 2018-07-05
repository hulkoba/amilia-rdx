// In order to get started, I create a simple backend for the app.
// It has 4 APIs to get contact list, post new contact, edit a contact and remove a contact.

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { getContacts, addToFile, updateFile, removeFromFile } = require('./utils/utils')

// Initialize http server
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', function (req, res) {
  res.send('Welcome to my contacts API')
})

// get all contacts
app.get('/contacts', async function (req, res) {
  const contacts = await getContacts()
  console.log('### read contacts ', contacts)
  res.send(contacts)
})

// create contact and send back all contacts after creation
app.post('/contacts', async function (req, res) {
  let contact = req.body.contact
  console.log('### req.body', req.body)
  if (!contact || typeof contact === 'undefined') {
    res.status(400).send({ msg: 'contact malformed.' })
  } else {
    console.log('### add contact ', contact)

    // set id here?
    contact._id = new Date().toISOString()
    contact.id = new Date().toISOString() // lazy
    // contact.type = 'contact'

    // persist contact
    await addToFile(contact)

    res.json(contact).send()
  }
})

// update a contact
app.put('/contacts/:id', async function (req, res) {
  console.log('### update contact with id: ', req.params.id)
  let contact = req.body.contact
  if (!contact) {
    res.status(400).send({ msg: 'contact malformed.' })
  }

  const contacts = await getContacts()
  // find, replace and send
  let editedContact = contacts.filter(c => (c.id === contact.id))
  editedContact = contact

  // update persisted contacts
  updateFile(editedContact)

  console.log('### updated contact ', editedContact)
  res.json(editedContact).send()
})

// delete a contact
app.delete('/contacts/:contact_id', async function (req, res) {
  const id = req.params.contact_id
  console.log('### delete contact ', id)

  removeFromFile(id)
  // TODO: decide where to handle the reload
  res.json({id: id}).send()
  // res.json(newContacs).send()
  // res.sendStatus(200)
})

const port = process.env.PORT || 1312
const server = app.listen(port, 'localhost', () => {
  const { address, port } = server.address()
  console.log(`Listening at http://${address}:${port}`)
})
