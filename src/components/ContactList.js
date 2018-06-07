import React from 'react'

import '../main.css'
import ContactForm from './ContactForm'

const ContactList = ({ state, handleOnEditClick, handleOnDeleteClick, handleCancel }) => {
  return (
    state.editView.isOpen
      ? <ContactForm handleCancel={handleCancel} contact={state.editView.contact} />

      : <ul className='contact-list'>
        {state.contacts.map(contact => (
          <li className='contact-list-li' key={contact.id}>
            <span>{contact.name}</span>
            <div className='action-btns'>
              <button onClick={handleOnEditClick.bind(this, contact)}>edit</button>
              <button onClick={handleOnDeleteClick.bind(this, contact.id)}>delete</button>
            </div>
          </li>
        ))
        }
      </ul>
  )
}

export default ContactList
