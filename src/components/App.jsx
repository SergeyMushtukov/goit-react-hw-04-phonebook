import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      try {
        localStorage.setItem(
          'contactsList',
          JSON.stringify(this.state.contacts)
        );
      } catch (error) {
        console.error('Set state error: ', error.message);
      }
    }
  }

  componentDidMount() {
    try {
      const contacts = localStorage.getItem('contactsList');
      const parsedContacts = JSON.parse(contacts);
      if (parsedContacts) {
        this.setState({ contacts: parsedContacts });
      }
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }

  onFilterInput = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getVisibleList = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onFormSubmit = data => {
    const enteredName = data.name;
    const normalizedName = enteredName.toLowerCase();
    if (
      this.state.contacts.some(
        ({ name }) => name.toLowerCase() === normalizedName
      )
    ) {
      return alert(`${enteredName} is already in contacts`);
    }
    const newContact = { id: nanoid(), ...data };
    this.setState(prevState => {
      return { contacts: [newContact, ...prevState.contacts] };
    });
  };

  render() {
    const { filter } = this.state;
    const visibleList = this.getVisibleList();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onFormSubmit}></ContactForm>

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.onFilterInput}></Filter>

        <ContactList
          list={visibleList}
          onDeleteContact={this.deleteContact}
        ></ContactList>
      </div>
    );
  }
}
