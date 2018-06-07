import React from 'react'

import '../main.css'

const handleChange = (type, contact, event) => {
  const val = event.target.value
  // let contact = this.state.contact

  if (type === 'name') {
    contact = { ...contact, name: val }
  }
  if (type === 'email') {
    contact = { ...contact, email: val }
  }
  if (type === 'phone') {
    contact = { ...contact, phone: val }
  }
  // this.setState(() => ({ contact: contact }))
}
const ContactForm = ({ addOrEditContact, handleCancel, contact }) => {

  // constructor (props) {
  //   super(props)
  //   // this.state = {
  //   //   contact: props.contact
  //   // }

  //   this.handleSubmit = this.handleSubmit.bind(this)
  //   // this.handleCancel = this.props.handleCancel

  // }

  // handleSubmit (event) {
  //   event.preventDefault()
  //   this.props.addOrEditContact(this.state.contact)
  // }

  // render () {
  //   // const { contact } = this.state
  console.log('### contact in Form', contact)

  return (
    <form className='contact-form' onSubmit={addOrEditContact}>
      <p>
        <label htmlFor='contact-name'>Name</label>
        <input
          type='text'
          name='contact-name'
          value={contact.name}
          onChange={handleChange.bind(this, 'name', contact)}
          required />
      </p>

      <p>
        <label htmlFor='contact-email'>Email</label>
        <input
          type='text'
          name='contact-email'
          value={contact.email}
          onChange={handleChange.bind(this, 'email')} />
      </p>

      <p>
        <label htmlFor='contact-phone'>Phone</label>
        <input
          type='text'
          name='contact-phone'
          value={contact.phone}
          onChange={handleChange.bind(this, 'phone')} />
      </p>

      <div className='footer action-btns'>
        <button type='button' onClick={handleCancel}>Cancel</button>
        <button type='submit'>Save</button>
      </div>
    </form>
  )
}
export default ContactForm
