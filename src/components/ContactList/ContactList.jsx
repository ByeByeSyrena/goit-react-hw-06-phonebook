import SelectedContact from 'components/SelectedContact/SelectedContact';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { initialFilter, getContacts } from 'redux/selectors';

const getVisibleContacts = (contacts, normalizedFilter) => {
  return contacts.filter(({ name }) => {
    if (typeof name === 'string') {
      return name.toLowerCase().includes(normalizedFilter);
    }
    return false;
  });
};

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(initialFilter);
  const normalizedFilter = filter ? filter.toLowerCase() : '';
  const visibleContacts = getVisibleContacts(contacts, normalizedFilter);

  return (
    <ul className={css.list}>
      {visibleContacts.map(contact => (
        <li key={contact.id} className={css.listItem}>
          <SelectedContact
            name={contact.name}
            number={contact.number}
            id={contact.id}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
