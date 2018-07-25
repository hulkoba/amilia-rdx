import React, { Component } from 'react'

import FormContainer from '../container/FormContainer'
import ContactList from './ContactList'
import Modal from './Modal'

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
    const { state, toggleEdit, chooseRev, addContact, editContact, deleteContact } = this.props
    return (
      <div>
        {state.modalView.hasConflict &&
          <Modal
            contactMe={state.modalView.contactMe}
            contactYou={state.modalView.contactYou}
            chooseRev={chooseRev.bind(this)} />
        }

        {state.editView.isOpen
          ? <FormContainer
            addContact={addContact}
            editContact={editContact}
            handleCancel={toggleEdit.bind(this, null)}
            contact={state.editView.contact} />

          : <ContactList
            contacts={state.contacts}
            handleOnEditClick={toggleEdit}
            handleOnDeleteClick={deleteContact} />
        }
      </div>
    )
  }
}

export default Contacts
