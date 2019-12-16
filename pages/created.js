import React from 'react';
import Feed from '../components/Feed/Feed';

const CreatedFeed = () => {
  return (
    <Feed
      active="new"
      selection={0}
      min_curation_score={0}
      orderby="created_at"
    />
  );
};

CreatedFeed.getInitialProps = () => {};

export default CreatedFeed;
