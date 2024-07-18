import AccountCreatedUI from '@/components/authComponent/AccountCreatedUI'
import Logo from '@/components/shared/Logo'
import React from 'react'

const page = () => {
  return (
    <div>
    <div className="flex justify-center items-center pt-5 lg:hidden">
      <Logo />
    </div>
    <div className="pt-5 pl-10 lg:block hidden">
      {' '}
      <Logo />
    </div>
    <AccountCreatedUI />
  </div>
  )
}

export default page