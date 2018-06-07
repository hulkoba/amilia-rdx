import React from 'react'

import '../main.css'
import ContactForm from './ContactForm'

const ContactList = ({ state, toggleEdit, handleOnDeleteClick, addContact, editContact }) => {
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

export default ContactList
