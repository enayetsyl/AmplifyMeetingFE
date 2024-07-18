import React from 'react'

const FormDropdownLabel = ({children, className}) => {
  return (
    <p className={`block text-sm font-semibold  ${className}`}>{children}</p>
  )
}

export default FormDropdownLabel