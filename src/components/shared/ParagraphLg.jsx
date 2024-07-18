import React from 'react'

const ParagraphLg = ({children, className}) => {
  return (
    <p
    className={`text-custom-dark-blue-1 text-lg  
    ${className}`}
    >{children}</p>
  )
}

export default ParagraphLg