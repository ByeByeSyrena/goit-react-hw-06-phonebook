import css from './ContactForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getName, getNumber } from 'redux/selectors';
import { addContact } from 'redux/actions';

const ContactForm = () => {
  const name = useSelector(getName);
  const number = useSelector(getNumber);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    if (!name || !number) {
      return;
    }

    dispatch(addContact(name, number));

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
        value={name}
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
        value={number}
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
