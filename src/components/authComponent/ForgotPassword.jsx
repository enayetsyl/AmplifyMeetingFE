import React from 'react';

import HorizontalBackground from '../shared/HorizontalBackground';
import ForgotPasswordUI from './ForgotPasswordUI';
const ForgotPassword = () => {
  return (
    <div>
      {/*  For large screen */}
      <div className="hidden lg:block">
        <HorizontalBackground>
          <ForgotPasswordUI />
        </HorizontalBackground>
      </div>
      {/* // For small screen */}
      <div className="lg:hidden">
        <ForgotPasswordUI />
      </div>
    </div>
  );
};

export default ForgotPassword;
