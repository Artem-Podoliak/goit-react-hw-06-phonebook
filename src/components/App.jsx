import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  getContactsItems,
  removeContact,
  addContact,
} from 'redux/contacts/slice';
import { getFilterValue } from 'redux/filter/slice';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

const App = () => {
  const contacts = useSelector(getContactsItems);
  const filterValue = useSelector(getFilterValue);
  // const dispatch = useDispatch();
  const qwery = 5;
  const getVisibleContacts = useMemo(() => {
    const normalizedFilter = filterValue.toLowerCase().trim();
    return contacts
      .filter(
        contact =>
          contact.name.toLowerCase().includes(normalizedFilter) ||
          contact.number.includes(normalizedFilter)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [contacts, filterValue]);

  const visibleContacts = getVisibleContacts();

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={css.title__contact}>Contacts</h2>
      <Filter
        label="Find contacts by name"
        value={filterValue}
        onChange={filterValue}
      />
      <ContactList contacts={visibleContacts} onDeleteContact={removeContact} />
    </div>
  );
};

export default App;
