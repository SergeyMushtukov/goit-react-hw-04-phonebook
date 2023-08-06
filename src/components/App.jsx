import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contactsList')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      window.localStorage.setItem('contactsList', JSON.stringify(contacts));
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }, [contacts]);

  const onFilterInput = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getVisibleList = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const onFormSubmit = data => {
    const enteredName = data.name;
    const normalizedName = enteredName.toLowerCase();
    if (contacts.some(({ name }) => name.toLowerCase() === normalizedName)) {
      return alert(`${enteredName} is already in contacts`);
    }
    const newContact = { id: nanoid(), ...data };
    setContacts(state => [newContact, ...state]);
  };

  const visibleList = getVisibleList();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onFormSubmit}></ContactForm>

      <h2>Contacts</h2>
      <Filter value={filter} onChange={onFilterInput}></Filter>

      <ContactList
        list={visibleList}
        onDeleteContact={deleteContact}
      ></ContactList>
    </div>
  );
};
