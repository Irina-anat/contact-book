import React from 'react';
import { nanoid } from "nanoid";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import initialContacts from '../contacts.json'
import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';


export class App extends React.Component {

  state = {
    contacts: initialContacts,
    filter: '',
  };
  

  addContact = ({ name, number }) => {
    console.log(name, number)
    const contact = {
      id: nanoid(),
      name,
      number,
    };
  
   const lowerCaseName = name.toLowerCase();

    this.state.contacts.some(
      contact =>
        (contact.name.toLowerCase() === lowerCaseName && contact.number === number) || contact.number === number || contact.name.toLowerCase() === lowerCaseName)

      ? Notify.warning('Контакт з таким іменем або номером вже присутній у телефонній книзі.')
 
      : this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
  };


  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value })
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
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Filter</h2>
        <Filter value={filter} onChange={this.changeFilter}/>
        <ContactList 
          contacts={this.visibleContacts()}
          onDeleteContact={this.deleteContact} />        
      </>
    )
  };
};


Notify.init({
  width: '500px',
  fontSize: '20px',
  position: 'center-top',
  closeButton: false,
});
