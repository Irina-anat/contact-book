import React from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'animate.css';
//import initialContacts from '../contacts.json';
import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
    // console.log('update contacts')
  }, [contacts]);

  const addContact = ({ name, number }) => {
    //  console.log(name, number);
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const lowerCaseName = name.toLowerCase();

    contacts.some(
      contact =>
        (contact.name.toLowerCase() === lowerCaseName &&
          contact.number === number) ||
        contact.number === number ||
        contact.name.toLowerCase() === lowerCaseName
    )
      ? Notify.warning(
          'The contact with this name or number already exists in the phonebook.'
        )
      : setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const visibleContacts = () => {
    //  console.log(filter)
    //  console.log(contacts)
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 overflow-hidden rounded-md style={ borderRadius: '8px' }">
      <h1 className="text-3xl font-semibold mb-4">Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className="text-xl font-semibold mt-6 mb-2">Filter</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={visibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

Notify.init({
  width: '300px',
  fontSize: '16px',
  position: 'center-top',
  closeButton: false,
});

// class
// export class App extends React.Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//     componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     //console.log('update contacts')
//     };
//   };

//   addContact = ({ name, number }) => {
//     console.log(name, number);
//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     const lowerCaseName = name.toLowerCase();

//     this.state.contacts.some(
//       contact =>
//         (contact.name.toLowerCase() === lowerCaseName &&
//           contact.number === number) ||
//         contact.number === number ||
//         contact.name.toLowerCase() === lowerCaseName
//     )
//       ? Notify.warning(
//           'The contact with this name or number already exists in the phonebook.'
//         )
//       : this.setState(prevState => ({
//           contacts: [contact, ...prevState.contacts],
//         }));
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   visibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const { filter } = this.state;
//     return (
//       <div className="max-w-md mx-auto p-4 bg-gray-100 overflow-hidden rounded-md style={ borderRadius: '8px' }">
//         <h1 className="text-3xl font-semibold mb-4">Phonebook</h1>
//         <ContactForm onSubmit={this.addContact} />
//         <h2 className="text-xl font-semibold mt-6 mb-2">Filter</h2>
//         <Filter value={filter} onChange={this.changeFilter} />
//         <ContactList
//           contacts={this.visibleContacts()}
//           onDeleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }
