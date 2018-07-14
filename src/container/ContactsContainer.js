import { connect } from 'react-redux'

import {
  readContacts,
  addContact,
  editContact,
  removeContact,
  chooseRev,
  toggleEdit } from '../rdx/actions'

import Contacts from '../components/Contacts'

const mapStateToProps = state => ({
  state
})

const mapDispatchToProps = dispatch => ({
  toggleEdit: contact => dispatch(toggleEdit(contact)),
  chooseRev: contact => dispatch(chooseRev(contact)),
  readContacts: () => dispatch(readContacts()),
  addContact: contact => dispatch(addContact(contact)),
  editContact: contact => dispatch(editContact(contact)),
  deleteContact: contact => dispatch(removeContact(contact))
})

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
