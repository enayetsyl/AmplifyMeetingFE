'use client'
import React, { useState } from 'react'
import HeadingH1 from '../shared/headingH1'
import ParagraphBlue2 from '../shared/ParagraphBlue2'
import Button from '../shared/button'
import BackToLogin from '../shared/BackToLogin'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import InputField from '../shared/InputField'

const ForgotPasswordUI = () => {
  const [email, setEmail] = useState('')
  return (
    <div className="py-20">
       <div className="max-w-[800px] mx-auto shadow_primary px-10 lg:px-20 bg-white rounded-xl">
         {/* icon div */}
         <div className="flex justify-center items-center py-5">
           ⁡⁢⁣⁢ {/* 𝗧𝗼𝗱𝗼- 𝗻𝗲𝗲𝗱 𝘁𝗼 𝗰𝗵𝗮𝗻𝗴𝗲 it to search icon */}⁡
           <FaEnvelopeOpenText className="h-20 w-20 " />
         </div>
         {/* text div */}
         <div className="px-3">
           <HeadingH1 children="FORGOT PASSWORD" />
           <ParagraphBlue2 children="Send a link to your email to reset your password." />
           
         </div>
         <div className="pt-10">
          <InputField
           label='Email'
           type='email'
           name='email'
           value= {email}
           onChange= {setEmail}
                     />
           <Button
             children="Send Reset Link"
             variant="primary"
             className="py-2 rounded-2xl w-full font-bold text-xl"
           />
         </div>
         <div className="pt-14 pb-20">
           <BackToLogin />
         </div>
       </div>
     </div>
  )
}

export default ForgotPasswordUI