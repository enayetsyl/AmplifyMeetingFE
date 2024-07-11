'use client'
// components/Button.js
import React from 'react';

const Button = ({ children, type = 'button', variant = 'default', onClick = () => {}, icon, className = '', ...props }) => {
  const baseStyles = 'flex items-center justify-center';
  const variantStyles = {
    primary: 'bg-custom-orange-1 hover:bg-custom-orange-2 text-white',
    secondary: 'bg-teal-700 hover:bg-teal-800 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    default: 'bg-blue-800 hover:bg-blue-900 text-white',
    save: 'bg-teal-600 hover:bg-teal-700 text-white',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
