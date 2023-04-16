import { useState } from "react";
import AddContact from "./AddContact";
import "./App.css";
import ContactList from "./ContactList";
import Header from "./Header";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactDetails from "./ContactDetails";
import api from "../api/contact";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = async (contact) => {
    const body = {
      id: uuidv4(),
      ...contact,
    };
    const response = await api.post("/contacts", body);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) {
    //   setContacts(retriveContacts);
    // }
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) {
        setContacts(allContacts);
      }
    };
    getAllContacts();
    // retrieveContacts().then((response) => {
    //   if (response) {
    //     setContacts(response);
    //   }
    // });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }, 1000);
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            exact
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            exact
            path="/edit"
            element={
              <EditContact updateContactHandler={updateContactHandler} />
            }
          />
          <Route
            exact
            path="/"
            element={
              <ContactList
                contacts={contacts}
                removeContactHandler={removeContactHandler}
              />
            }
          />
          <Route path="/contact/:id" element={<ContactDetails />} />
          {/* <AddContact addContactHandler={addContactHandler} /> */}
          {/* <ContactList contacts={contacts} removeContactHandler={removeContactHandler} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
