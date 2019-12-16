import React, { useEffect, useState } from 'react';
import Feed from '../components/Feed/Feed';
import MobileDialog from '../components/Feed/MobileDialog';
import { getUser } from '../helpers/token';

const FeaturedFeed = props => {
  const { app } = props;

  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    if (app) setIsApp(getUser() === undefined);
  }, []);

  return (
    <>
      {isApp && <MobileDialog />}
      <Feed
        active="featured"
        selection={3}
        min_curation_score={9000}
        orderby="created_at"
      />
    </>
  );
};

FeaturedFeed.getInitialProps = () => {};

FeaturedFeed.getInitialProps = props => {
  const { utm_source } = props.query;
  const app = utm_source === 'pwa';
  return { app };
};

export default FeaturedFeed;
