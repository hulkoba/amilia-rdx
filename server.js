// In order to get started, I create a simple backend for the app.
// It has 4 APIs to get contact list, post new contact, edit a contact and remove a contact.

const express = require('express')
const bodyParser = require('body-parser')

const { getContacts, addToFile, updateFile, removeFromFile } = require('./utils/utils')

// Initialize http server
const app = express()

app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

app.get('/', function (req, res) {
  res.send('Welcome to my contacts API')
})

// get all contacts
app.get('/contacts', async function (req, res) {
  console.log('### read contacts ')
  const contacts = await getContacts()
  res.send(contacts)
})

// create contact and send back all contacts after creation
app.post('/contacts', function (req, res) {
  let contact = req.body.contact
  if (!contact) {
    res.status(400).send({ msg: 'contact malformed.' })
  }
  console.log('### add contact ', contact)

  // set id here?
  contact.id = new Date().toISOString()
  contact.type = 'contact'

  // persist contact
  addToFile(contact)

  res.json(contact).send()
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
