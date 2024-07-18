import React from 'react';

import HorizontalBackground from '../shared/HorizontalBackground';
import ResendEmailUI from './ResendEmailUI';
const ResendEmail = () => {
  return (
    <div>
      {/*  For large screen */}
      <div className="hidden lg:block">
        <HorizontalBackground>
          <ResendEmailUI />
        </HorizontalBackground>
      </div>
      {/* // For small screen */}
      <div className="lg:hidden">
        <ResendEmailUI />
      </div>
    </div>
  );
};

export default ResendEmail;
