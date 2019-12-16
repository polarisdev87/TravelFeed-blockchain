import React from 'react';
import AllNotifications from './AllNotifications';

const Notifications = () => {
  return (
    <>
      <div className="container pb-3">
        <div className="row row justify-content-center">
          <div className="col-xl-8 col-lg-8 col-md-9 col-sm-10 col-12">
            <AllNotifications />
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
