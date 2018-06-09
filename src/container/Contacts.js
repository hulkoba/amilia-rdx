import { connect } from 'react-redux'

import {
  readContacts,
  addContact,
  editContact,
  removeContact,
  toggleEdit } from '../rdx/actions'

import ContactList from '../components/ContactList'

const mapStateToProps = state => ({
  state
})

const mapDispatchToProps = dispatch => ({
  toggleEdit: contact => dispatch(toggleEdit(contact)),
  readContacts: () => dispatch(readContacts()),
  addContact: contact => dispatch(addContact(contact)),
  editContact: contact => dispatch(editContact(contact)),
  handleOnDeleteClick: contact => dispatch(removeContact(contact))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)
