import React, { Fragment, useEffect, useState } from 'react';
import Bookmarks from '../components/Bookmarks/Bookmarks';
import ErrorPage from '../components/General/ErrorPage';
import Head from '../components/Header/Head';
import Header from '../components/Header/Header';
import { getUser } from '../helpers/token';

const BookmarksPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <Fragment>
      <Header subheader="Bookmarks" active="bookmarks" />
      <Head title="Bookmarks" />
      {(user === null && <></>) ||
        (user && (
          <>
            <div className="pb-2">
              <div className="container" id="containerInvisibleOnMobile">
                <Bookmarks user={user} />
              </div>
            </div>
            <style>{`
        @media (max-width: 992px) {
          #containerInvisibleOnMobile {
            padding: 0;
            margin: 0;
          }
        }
        `}</style>
          </>
        )) || <ErrorPage statusCode="logged_out" />}
    </Fragment>
  );
};

export default BookmarksPage;
