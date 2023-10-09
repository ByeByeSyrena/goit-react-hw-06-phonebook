import 'normalize.css';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, initialFilter } from 'redux/selectors';

function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(initialFilter);
  const dispatch = useDispatch();

  const storageOLd = () => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  };

  const loginInputId = nanoid();

  localStorage.setItem('contacts', JSON.stringify(contacts));

  const handleChange = event => {
    const { value } = event.target;
    return value;
  };

  const handleSubmit = (name, number) => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
    reset();
  };

  const handleRemove = contactId => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactId
    );

    setContacts(updatedContacts);
  };

  const showSelectedContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const reset = () => {
    setFilter('');
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
