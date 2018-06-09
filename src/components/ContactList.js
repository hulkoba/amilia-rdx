import React, { Component } from 'react'

import '../main.css'
import ContactForm from './ContactForm'

class ContactList extends Component {
  componentDidMount () {
    this.props.readContacts()
  }

  shouldComponentUpdate (nextProps, nextState) {
    if ((nextProps.state.contacts === this.props.state.contacts) && (nextProps.state.editView.isOpen === this.props.state.editView.isOpen)) {
      return false
    }
    return true
  }

  render () {
    const { state, toggleEdit, handleOnDeleteClick, addContact, editContact } = this.props
    // console.log('### state', state)
    return (
      state.editView.isOpen
        ? <ContactForm
          handleCancel={toggleEdit}
          addContact={addContact}
          editContact={editContact}
          contact={state.editView.contact} />

        : <ul className='contact-list'>
          {state.contacts.map(contact => (
            <li className='contact-list-li' key={contact.id}>
              <span>{contact.name}</span>
              <div className='action-btns'>
                <button onClick={toggleEdit.bind(this, contact)}>edit</button>
                <button onClick={handleOnDeleteClick.bind(this, contact)}>delete</button>
              </div>
            </li>
          ))
          }
        </ul>
    )
  }
}

export default ContactList
