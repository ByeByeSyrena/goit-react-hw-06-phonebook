import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { getContacts, initialFilter } from '../redux/selectors';
import { addContact, deleteContact, setFilter } from '../redux/actions';

function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(initialFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      dispatch(addContact(JSON.parse(savedContacts)));
    }
  }, [dispatch]);

  const loginInputId = nanoid();

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const handleSubmit = (name, number) => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ id: nanoid(), name, number }));
  };

  const handleRemove = contactId => {
    dispatch(deleteContact(contactId));
  };

  const showSelectedContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = showSelectedContact();

  return (
    <>
      <ContactForm onSubmit={handleSubmit} />
      <Filter
        handleChange={handleChange}
        filter={filter}
        loginInputId={loginInputId}
      />
      <ContactList
        filteredContacts={filteredContacts}
        handleRemove={handleRemove}
      />
    </>
  );
}

export default App;
