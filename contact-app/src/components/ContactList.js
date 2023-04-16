import React from 'react'
import ContactCard from './ContactCard'
import { Link } from 'react-router-dom'

const ContactList = (props) => {
    const removeContactHandler = (id) => {
        props.removeContactHandler(id)
    }
    const reanderContactList = props.contacts.map((contact) => {
        return(
            <ContactCard key={contact.id} contact={contact} removeContactHandler={removeContactHandler}></ContactCard>
        )
    })
  return (
    <div className='main'>
      <h2>
        Contact List
        <Link to="/add">
        <button className='ui right floated primary button'>Add Contact</button>
        </Link>
      </h2>
    <div className='ui celled list'>
      {reanderContactList}
    </div>
    </div>
  )
}

export default ContactList
