import React from 'react';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul
    className="list-none p-0
  animate__animated animate__fadeInUp"
  >
    {contacts.map(({ id, name, number }) => (
      <li key={id} className="flex items-center justify-between border-b py-2">
        <div>
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-gray-500">{number}</p>
        </div>
        <button
          onClick={() => onDeleteContact(id)}
          className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default ContactList;
