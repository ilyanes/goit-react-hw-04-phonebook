import './App.styled.jsx';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Container } from './App.styled.jsx';
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import { Filter } from './Filter/FIlter.jsx';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const derivedContact = JSON.parse(localStorage.getItem('contacts'));

const App = () => {
  const [contacts, setContacts] = useState(
    () => derivedContact ?? defaultContacts
  );
  const [filter, setFilter] = useState('');

  const notify = () =>
    toast.warn('That NAME or NUMBER already exist', {
      position: toast.POSITION.TOP_CENTER,
    });
  const isContactDubled = (arr, data, key) => {
    return arr.some(
      contact =>
        contact[key].toLocaleLowerCase() === data[key].toLocaleLowerCase()
    );
  };
  const onFormSubmit = data => {
    if (
      isContactDubled(contacts, data, 'name') ||
      isContactDubled(contacts, data, 'number')
    ) {
      notify();
      return;
    }
    setContacts(prevState => [...prevState, { id: uuidv4(), ...data }]);
  };
  const filterHendle = data => {
    setFilter(data);
  };
  const handleDelete = e => {
    const chengedContacts = contacts.filter(
      contact => contact.id !== e.currentTarget.parentElement.id
    );
    setContacts(chengedContacts);
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = contacts.filter(contact => {
    return contact.name
      .toLocaleLowerCase()
      .includes(filter.toLocaleLowerCase());
  });
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm
        onSubmit={onFormSubmit}
        contacts={contacts}
        isContDubled={isContactDubled}
      ></ContactForm>
      <ToastContainer />
      <h2>Contacts:</h2>
      <Filter onFilter={filterHendle}></Filter>
      <ContactList
        contacts={filter !== '' ? filteredContacts : contacts}
        onDelete={handleDelete}
      ></ContactList>
    </Container>
  );
};

export default App;

App.propTypes = {
  data: PropTypes.object,
};
