// In order to get started, I create a simple backend for the app.
// It has 4 APIs to get contact list, post new contact, edit a contact and remove a contact.

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// Initialize http server
const app = express()

// TODO need to configure the path
app.use(express.static(path.join(__dirname, 'client', 'public')))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const contacts = [{
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
let id = 99999

// get all contacts
app.get('/', function (req, res) {
  res.send('Welcome to my contacts API')
})

app.get('/contacts', function (req, res) {
  console.log('### read contacts', contacts)
  res.send(contacts)
})

// create contact and send back all contacts after creation
app.post('/contacts', bodyParser.json(), function (req, res) {
  console.log(req.body)
  let contact = req.body
  if (!contact) {
    res.status(400).send({ msg: 'contact malformed.' })
  }
  // set id here?
  contact.id = id++
  contacts.push(contact)
  res.json({ id: id }).send()
})

// update a contact
app.put('/contacts/:id', function (req, res) {
  console.log('### update contact ', req.params.id)
  let contact = req.body
  if (!contact) {
    res.status(400).send({ msg: 'contact malformed.' })
  }

  res.send(contact)
})

// delete a contact
app.delete('/contacts/:contact_id', function (req, res) {
  const id = req.params.id
  console.log('### id', id)
  let index = contacts.findIndex(item => item.id === req.query.id)
  contacts.splice(index, 1)
  res.sendStatus(200)
  //   // get and return all the contacts after you create another
  //   Contact.find(function (err, contacts) {
  //     if (err)
  //       res.send(err)
  //     res.json(contacts)
  //   })
  // })
})

const port = process.env.PORT || 1312
const server = app.listen(port, 'localhost', () => {
  const { address, port } = server.address()
  console.log(`Listening at http://${address}:${port}`)
})
