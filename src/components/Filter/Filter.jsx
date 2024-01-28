import React from 'react';

const Filter = ({ value, onChange }) => (
  <label className="block mb-4">
    <span className="text-gray-700">Find contacts by Name</span>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 hover:border-blue-500"
    />
  </label>
);

export default Filter;
