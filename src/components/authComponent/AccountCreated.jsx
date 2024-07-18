import React from 'react';

import HorizontalBackground from '../shared/HorizontalBackground';
import AccountCreatedUI from './AccountCreatedUI';
const AccountCreated = () => {
  return (
    <div>
      {/*  For large screen */}
      <div className="hidden lg:block">
        <HorizontalBackground>
          <AccountCreatedUI />
        </HorizontalBackground>
      </div>
      {/* // For small screen */}
      <div className="lg:hidden">
        <AccountCreatedUI />
      </div>
    </div>
  );
};

export default AccountCreated;
