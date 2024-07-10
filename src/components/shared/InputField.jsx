// components/InputField.js
import React from 'react';

const InputField = ({ label, type = 'text', name, value, onChange, placeholder, error, icon }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {icon && (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            {icon}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default InputField;
