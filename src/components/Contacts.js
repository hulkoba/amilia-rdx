import React, { Component } from 'react'

import FormContainer from '../container/FormContainer'
import ContactList from './ContactList'

class Contacts extends Component {
  componentDidMount () {
    this.props.readContacts()
  }

  shouldComponentUpdate (nextProps) {
    if ((nextProps.state.contacts === this.props.state.contacts) &&
      (nextProps.state.editView.isOpen === this.props.state.editView.isOpen)) {
      return false
    }
    return true
  }

  render () {
    const { state, toggleEdit, addContact, editContact, deleteContact } = this.props
    return (
      state.editView.isOpen
        ? <FormContainer
          addContact={addContact}
          editContact={editContact}
          handleCancel={toggleEdit.bind(this, null)}
          contact={state.editView.contact} />

        : <ContactList
          contacts={state.contacts}
          handleOnEditClick={toggleEdit}
          handleOnDeleteClick={deleteContact} />
    )
  }
}

export default Contacts
