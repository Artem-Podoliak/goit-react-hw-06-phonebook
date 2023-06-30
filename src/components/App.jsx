import { useSelector, useDispatch } from 'react-redux';
import {
  getContactsItems,
  removeContact,
  addContact,
} from './../redux/contacts/slice.jsx';
import { getFilterValue } from './../redux/filter/slice';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

const App = () => {
  const contacts = useSelector(getContactsItems);
  const filterValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const getVisibleContacts = () => {
    const normalizedFilter = filterValue.toLowerCase().trim();
    return contacts
      .filter(
        contact =>
          contact.name.toLowerCase().includes(normalizedFilter) ||
          contact.number.includes(normalizedFilter)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const visibleContacts = getVisibleContacts();

  const handleFilterChange = event => {
    const newFilterValue = event.target.value;

    dispatch(newFilterValue);
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={css.title__contact}>Contacts</h2>
      <Filter
        label="Find contacts by name"
        value={filterValue}
        onChange={handleFilterChange}
      />
      <ContactList contacts={visibleContacts} onDeleteContact={removeContact} />
    </div>
  );
};

export default App;
