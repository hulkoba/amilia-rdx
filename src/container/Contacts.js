import { connect } from 'react-redux'

import {
  // addContact,
  // readContacts,
  // editContact,
  removeContact, toggleEdit } from '../rdx/actions'

import ContactList from '../components/ContactList'

// const API = 'http://127.0.0.1:1312'

// componentDidMount () {
//   this.fetchContacts()
//     .then(res => this.setState({ contacts: res.contacts }))
//     .catch(err => console.log(err))
// }

// const fetchContacts = async() => {
//   try {
//     const response = await fetch(`${API}/`)
//     const body = await response.json()

//     return body
//   } catch (error) { console.log(error) }
// }

// // add or edit contact
// addContact (contact) {
//   console.log('### add or edit contact', contact)
//   let newContacts
//   // add a new contact
//   if (!contact.id) {
//     contact.id = new Date().toISOString()
//     newContacts = this.state.contacts.concat(contact)
//     // find and replace contact
//   } else {
//     newContacts = this.state.contacts.map(c => {
//       if (c.id === contact.id) return contact
//       return c
//     })
//   }
//   this.setState(() => {
//     return {
//       contacts: newContacts,
//       editView: false
//     }
//   })
//   // TODO send it to Server
// }

// goToEdit (contact) {
//   console.log('### edit contact', contact)
//   this.setState(() => {
//     return {
//       editView: true,
//       contact: contact.id ? contact : { name: '', email: '', phone: '' }
//     }
//   })
// }
// deleteContact (id) {
//   console.log('### delete contact', id)
//   // Filter all contacts except the one to be removed
//   const remainder = this.state.contacts.filter(contact => contact.id !== id)

//   this.setState(() => ({ contacts: remainder }))
//   // TODO: delete on Server
// }

const mapStateToProps = state => ({
  state
})

// const contacts = fetchContacts()
const mapDispatchToProps = dispatch => ({
  handleOnEditClick: contact => dispatch(toggleEdit(contact)),
  handleCancel: () => dispatch(toggleEdit()),
  handleOnDeleteClick: contact => dispatch(removeContact(contact))
})

// render () {
//   console.log(this.state)
//   return (
//     <ContactList
//       contacts={this.state.contacts}
//       handleOnEditClick={this.goToEdit.bind(this)}
//       handleOnDeleteClick={this.deleteContact.bind(this)}
//     />
//   )
// }
// }

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)
