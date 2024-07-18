import React from 'react';

import HorizontalBackground from '../shared/HorizontalBackground';
import PasswordResetUI from './PasswordResetUI';
const PasswordReset = () => {
  return (
    <div>
      {/*  For large screen */}
      <div className="hidden lg:block">
        <HorizontalBackground>
          <PasswordResetUI />
        </HorizontalBackground>
      </div>
      {/* // For small screen */}
      <div className="lg:hidden">
        <PasswordResetUI />
      </div>
    </div>
  );
};

export default PasswordReset;
