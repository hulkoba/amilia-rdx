// In order to get started, I create a simple backend for the app.
// It has 4 APIs to get contact list, post new contact, edit a contact and remove a contact.

const express = require('express')
const bodyParser = require('body-parser')
// const path = require('path')

// Initialize http server
const app = express()

// TODO need to configure the path
// app.use(express.static(path.join(__dirname, 'client', 'public')))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

let contacts = [{
  name: 'Amilia Pond',
  id: 11,
  email: 'amilia@pond.com',
  phone: '34567899876'
}, {
  name: 'Doctor Who',
  id: 22,
  email: 'doctor@who.com',
  phone: '34567899876'
}]

app.get('/', function (req, res) {
  res.send('Welcome to my contacts API')
})

// get all contacts
app.get('/contacts', function (req, res) {
  console.log('### read contacts', contacts)
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

  contacts.push(contact)
  res.json(contact).send()
})

// update a contact
app.put('/contacts/:id', function (req, res) {
  console.log('### update contact ', req.params.id)
  let contact = req.body.contact
  if (!contact) {
    res.status(400).send({ msg: 'contact malformed.' })
  }

  // find, replace and send
  let editedContact = contacts.filter(c => (c.id === contact.id))
  editedContact = contact

  // update persisted contacts
  contacts = contacts.map(c => {
    if (c.id === contact.id) return contact
    return c
  })
  console.log('### contacts', contacts)

  res.json(editedContact).send()
})

// delete a contact
app.delete('/contacts/:contact_id', function (req, res) {
  const id = req.params.contact_id
  console.log('### delete contact ', id)

  // const index = contacts.findIndex(item => item.id === id)
  // contacts.splice(index, 1)

  // return all the items not matching the action.id
  contacts = contacts.filter(c => c.id !== id)
  console.log('### new contact after delete', contacts)

  res.json(contacts).send()
  // TODO: decide where to handle the reload
  // res.sendStatus(200)
})

const port = process.env.PORT || 1312
const server = app.listen(port, 'localhost', () => {
  const { address, port } = server.address()
  console.log(`Listening at http://${address}:${port}`)
})
