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
    const getSerchTerm = (e) => {
      props.searchKeyWord(e.target.value)
    }
  return (
    <div className='main'>
      <h2>
        Contact List
        <Link to="/add">
        <button className='ui right floated primary button'>Add Contact</button>
        </Link>
      </h2>
      <div className='ui search'>
        <div className='ui icon input'>
          <input type='text' placeholder='Search Contact' className='promt' value={props.term} onChange={getSerchTerm}></input>
          <i className='search icon'></i>
        </div>
      </div>
    <div className='ui celled list'>
      {reanderContactList.length > 0 ? reanderContactList : "No Contact available"}
    </div>
    </div>
  )
}

export default ContactList
