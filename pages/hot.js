import React from 'react';
import Feed from '../components/Feed/Feed';

const HotFeed = () => {
  return (
    <Feed
      active="taking Off"
      selection={1}
      min_curation_score={0}
      orderby="sc_hot"
    />
  );
};

HotFeed.getInitialProps = () => {};

export default HotFeed;
