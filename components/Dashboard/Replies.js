import React, { Fragment } from 'react';
import { getUser } from '../../helpers/token';
import PostGrid from '../Grid/PostGrid';

const Replies = () => {
  return (
    <Fragment>
      <div className="pt-1 pb-3">
        <PostGrid
          query={{
            parent_author: getUser(),
            is_comment: true,
            limit: 8,
          }}
          grid={{ lg: 8, md: 10, sm: 11, xs: 12 }}
          poststyle="comment"
        />
      </div>
    </Fragment>
  );
};

export default Replies;
