'use client'
import Link from 'next/link'
import React from 'react'

const BackToLogin = () => {
  return (
    <Link href='/login'>
      <p className='text-lg text-custom-light-blue-1 text-center font-semibold cursor-pointer'>Back To Login</p>
    </Link>
  )
}

export default BackToLogin