import React from 'react';

import HorizontalBackground from '../shared/HorizontalBackground';
import SetNewPasswordUI from './SetNewPasswordUI';
const SetNewPassword = () => {
  return (
    <div>
      {/*  For large screen */}
      <div className="hidden lg:block">
        <HorizontalBackground>
          <SetNewPasswordUI />
        </HorizontalBackground>
      </div>
      {/* // For small screen */}
      <div className="lg:hidden">
        <SetNewPasswordUI />
      </div>
    </div>
  );
};

export default SetNewPassword;
