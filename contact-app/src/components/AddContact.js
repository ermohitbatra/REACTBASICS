import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const AddContact = (props) => {
const [contact, setContact] = useState({name:"", email:""})
let history = useNavigate();
const handleChange = (e) =>{
    setContact({...contact, [e.target.name]:e.target.value})
}
const add = (e) => {
    e.preventDefault();
    if(contact.name === "" && contact.email === "")
    {
        alert("All the fields are mandatory")
        return
    }
    props.addContactHandler(contact);
    setContact({name:"", email:""});
    history("/");
}
  return (
    <div className='ui main'>
        <h2>Add Contact</h2>
        <form className='ui form'>
            <div className='field'>
                <label>Name</label>
                <input type='text' name="name" placeholder='Name' value={contact.name} onChange={handleChange}></input>
            </div>
            <div className='field'>
                <label>Email</label>
                <input type='text' name="email" placeholder='Email' value={contact.email} onChange={handleChange}></input>
            </div>
            <button className='ui button blue' onClick={add}>Add</button>
        </form>
      
    </div>
  )
}

export default AddContact
