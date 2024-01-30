import React from 'react';
import { MdDeleteForever } from "react-icons/md";

const Contact = ({ name, number, onDeleteContact }) => (
    <>
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-gray-500">{number}</p>
        <button
            onClick={onDeleteContact}
            className="text-white bg-green-500 hover:bg-red-600 px-3 py-1 rounded-md focus:outline-none flex items-center space-x-2"
        >
            <span>Delete</span>
            <MdDeleteForever/>
        </button>

    </>
);

export default Contact;