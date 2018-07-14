import React, { Component } from 'react'

import '../main.css'

class ContactForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contact: props.contact
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.props.handleCancel
  }

  handleChange (type, event) {
    const val = event.target.value
    let contact = this.state.contact

    if (type === 'name') {
      contact = { ...contact, name: val }
    }
    if (type === 'email') {
      contact = { ...contact, email: val }
    }
    if (type === 'phone') {
      contact = { ...contact, phone: val }
    }
    this.setState(() => ({ contact: contact }))
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.contact.id) {
      this.props.editContact(this.state.contact)
    } else {
      const newContact = {
        ...this.state.contact,
        id: new Date().toISOString()
      }
      this.props.addContact(newContact)
    }
    // go to listView
    this.props.handleCancel()
  }

  render () {
    const { contact } = this.state

    return (
      <form className='contact-form' onSubmit={this.handleSubmit}>
        <p>
          <label htmlFor='contact-name'>Name</label>
          <input
            type='text'
            name='contact-name'
            value={contact.name}
            onChange={this.handleChange.bind(this, 'name')}
            required />
        </p>

        <p>
          <label htmlFor='contact-email'>Email</label>
          <input
            type='text'
            name='contact-email'
            value={contact.email}
            onChange={this.handleChange.bind(this, 'email')} />
        </p>

        <p>
          <label htmlFor='contact-phone'>Phone</label>
          <input
            type='text'
            name='contact-phone'
            value={contact.phone}
            onChange={this.handleChange.bind(this, 'phone')} />
        </p>

        <div className='footer action-btns'>
          <button type='button' onClick={this.handleCancel}>Cancel</button>
          <button type='submit'>Save</button>
        </div>
      </form>
    )
  }
}

export default ContactForm
