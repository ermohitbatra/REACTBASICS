import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const EditContact = (props) => {
    let location = useLocation();
    const [contact, setContact] = useState(location.state.contact)
    let history = useNavigate();
    const handleChange = (e) =>{
        setContact({...contact, [e.target.name]:e.target.value})
    }
    const update = (e) => {
        e.preventDefault();
        if(contact.name === "" && contact.email === "")
        {
            alert("All the fields are mandatory")
            return
        }
        props.updateContactHandler(contact);
        setContact({id:"", name:"", email:""});
        history("/");
    }
      return (
        <div className='ui main'>
            <h2>Edit Contact</h2>
            <form className='ui form'>
                <div className='field'>
                    <label>Name</label>
                    <input type='text' name="name" placeholder='Name' value={contact.name} onChange={handleChange}></input>
                </div>
                <div className='field'>
                    <label>Email</label>
                    <input type='text' name="email" placeholder='Email' value={contact.email} onChange={handleChange}></input>
                </div>
                <button className='ui button blue' onClick={update}>Update</button>
            </form>
          
        </div>
      )
}

export default EditContact
