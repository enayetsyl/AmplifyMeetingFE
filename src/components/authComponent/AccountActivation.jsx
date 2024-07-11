import React from 'react';

import HorizontalBackground from '../shared/HorizontalBackground';
import AccountActivationUI from './AccountActivationUI';
const AccountActivation = () => {
  return (
   <div> 
    {/*  For large screen */}
   <div className='hidden lg:block'>
<HorizontalBackground>
<AccountActivationUI/>
   </HorizontalBackground>
   </div>
   {/* // For small screen */}
   <div className='lg:hidden'>

   <AccountActivationUI/>
   
   </div>
   </div>
  );
};

export default AccountActivation;
