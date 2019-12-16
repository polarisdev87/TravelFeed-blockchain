import React from 'react';
import Feed from '../components/Feed/Feed';

const DiscoverFeed = () => {
  return (
    <Feed
      active="discover"
      selection={2}
      min_curation_score={9000}
      orderby="random"
    />
  );
};

DiscoverFeed.getInitialProps = () => {};

export default DiscoverFeed;
