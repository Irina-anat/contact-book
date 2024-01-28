import React from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'animate.css';
import initialContacts from '../contacts.json';
import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends React.Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  addContact = ({ name, number }) => {
    console.log(name, number);
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const lowerCaseName = name.toLowerCase();

    this.state.contacts.some(
      contact =>
        (contact.name.toLowerCase() === lowerCaseName &&
          contact.number === number) ||
        contact.number === number ||
        contact.name.toLowerCase() === lowerCaseName
    )
      ? Notify.warning(
          'The contact with this name or number already exists in the phonebook.'
        )
      : this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <div className="max-w-md mx-auto p-4 bg-gray-100 overflow-hidden rounded-md style={ borderRadius: '8px' }">
        <h1 className="text-3xl font-semibold mb-4">Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2 className="text-xl font-semibold mt-6 mb-2">Filter</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={this.visibleContacts()}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

Notify.init({
  width: '300px',
  fontSize: '16px',
  position: 'center-top',
  closeButton: false,
});
