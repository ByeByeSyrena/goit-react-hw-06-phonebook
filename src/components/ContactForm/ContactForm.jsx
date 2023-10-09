import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/actions';
import { getContacts } from 'redux/selectors';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = event => {
    event.preventDefault();

    const nameValue = event.target.name.value;
    const numberValue = event.target.number.value;

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === nameValue.toLowerCase()
    );

    if (existingContact) {
      alert(`${nameValue} is already in contacts`);
      return;
    }

    dispatch(addContact(nameValue, numberValue));

    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <h1>Phonebook</h1>
      <h3>Name</h3>
      <input
        type="text"
        name="name"
        title="Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={e =>
          dispatch({ type: 'UPDATE_NAME', payload: e.target.value })
        }
      />
      <h3>Number</h3>
      <input
        type="tel"
        name="number"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={e =>
          dispatch({ type: 'UPDATE_NUMBER', payload: e.target.value })
        }
      />
      <button type="submit" className={css.buttonAddContact}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
