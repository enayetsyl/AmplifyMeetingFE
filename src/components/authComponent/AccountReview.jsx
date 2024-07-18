import React from 'react';

import HorizontalBackground from '../shared/HorizontalBackground';
import AccountReviewUI from './AccountReviewUI';
const AccountReview = () => {
  return (
    <div>
      {/*  For large screen */}
      <div className="hidden lg:block">
        <HorizontalBackground>
          <AccountReviewUI />
        </HorizontalBackground>
      </div>
      {/* // For small screen */}
      <div className="lg:hidden">
        <AccountReviewUI />
      </div>
    </div>
  );
};

export default AccountReview;
