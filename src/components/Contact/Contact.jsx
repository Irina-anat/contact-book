import React from 'react';

const Contact = ({ name, number, onDeleteContact }) => (
    <>
        <p className="text-lg font-semibold">{name}</p>
            <p className="text-gray-500">{number}</p>   
        <button
            onClick={onDeleteContact}
            className="text-white bg-green-500 hover:bg-red-600 px-3 py-1 rounded-md focus:outline-none  focus:border-red-300"
        >
            Delete
        </button>
    </>    
);

export default Contact;