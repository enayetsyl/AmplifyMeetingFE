'use client'
import Image from 'next/image'
import React from 'react'
import Error401Image from '../../../public/401.png'
import HeadingBlue25px from '../shared/HeadingBlue25px'
import ParagraphBlue2 from '../shared/ParagraphBlue2'
import Button from '../shared/button'
import Footer from '../shared/Footer'
import { useRouter } from 'next/navigation'

const Error401 = () => {
  const router = useRouter()

  return (
    <>
    <div className='flex flex-col justify-center items-center pb-10 '>
      <Image
      src={Error401Image}
      alt='401'
      height={200}
      width={200}
      className='bg-white w-1/3'
      />

      <h1 className='text-8xl font-bold text-custom-dark-blue-1 pb-5'>401</h1>
      <HeadingBlue25px children='ACCESS DENIED' />
      <div className='my-5 px-10'>
      <ParagraphBlue2
      children="Sorry, you don't have permission to access this page."
      />
      </div>
      <Button
      onClick={()=> router.back()}
      children='Go Back'
      className='rounded-lg py-2 text-white w-[300px]'
      variant='primary'
      />

      </div>
      <Footer/>
    </>
  )
}

export default Error401