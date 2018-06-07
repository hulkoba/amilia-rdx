import { connect } from 'react-redux'

import {
  // readContacts,
  addContact,
  editContact,
  removeContact,
  toggleEdit } from '../rdx/actions'

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

const mapStateToProps = state => ({
  state
})

const mapDispatchToProps = dispatch => ({
  toggleEdit: contact => dispatch(toggleEdit(contact)),
  addContact: contact => dispatch(addContact(contact)),
  editContact: contact => dispatch(editContact(contact)),
  handleOnDeleteClick: contact => dispatch(removeContact(contact))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)
