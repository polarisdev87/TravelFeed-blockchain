import React, { useEffect, useState } from 'react';
import Feed from '../components/Feed/Feed';
import { getUser } from '../helpers/token';

const CustomFeed = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <>
      <Feed
        active="feed"
        selection={4}
        min_curation_score={0}
        orderby="created_at"
        feed={user}
        isFeed
      />
    </>
  );
};

CustomFeed.getInitialProps = () => {};

export default CustomFeed;
