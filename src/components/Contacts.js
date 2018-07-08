import React, { Component } from 'react'

import ContactForm from './ContactForm'
import ContactList from './ContactList'

class Contacts extends Component {
  componentDidMount () {
    this.props.readContacts()
  }

  shouldComponentUpdate (nextProps, nextState) {
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
        ? <ContactForm
          handleCancel={toggleEdit.bind(this, null)}
          addContact={addContact}
          editContact={editContact}
          contact={state.editView.contact} />

        : <ContactList
          contacts={state.contacts}
          handleOnEditClick={toggleEdit}
          handleOnDeleteClick={deleteContact} />
    )
  }
}

export default Contacts
