const express = require('express')
// const path = require('path')

// Initialize http server
const app = express()

app.get('/', function (req, res) {
  res.send({
    contacts: [{
      name: 'Amilia Pond',
      id: 11,
      email: 'amilia@pond.com',
      phone: '34567899876'
    }, {
      name: 'Doctor Who',
      id: 22,
      email: 'doctor@who.com',
      phone: '34567899876'
    }]}
  )
  // res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// create contact and send back all contacts after creation
app.post('/contacts', function (req, res) {

  // Contact.create({
  //   name: req.body.name,
  //   done: false
  // }, function (err, contact) {
  //   if (err) res.send(err)

  //   Contact.find(function (err, contacts) {
  //     if (err) res.send(err)
  //     res.json(contacts)
  //   })
  // })
})

// delete a contact
app.delete('/contacts/:contact_id', function (req, res) {
  // Contact.remove({
  //   _id: req.params.contact_id
  // }, function (err, contact) {
  //   if (err) res.send(err)

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
