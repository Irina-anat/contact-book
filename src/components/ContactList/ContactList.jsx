import Contact from 'components/Contact/Contact';
import React from 'react';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul
    className="list-none p-0
  animate__animated animate__fadeInUp"
  >
    {contacts.map(({ id, name, number }) => (
      <li key={id} className="flex items-center justify-between border-b py-2">
        <Contact
        name={name}
        number={number}
        onDeleteContact={() => { onDeleteContact(id) }}
      />        
    </li>      
    ))}
  </ul>
);

export default ContactList;
