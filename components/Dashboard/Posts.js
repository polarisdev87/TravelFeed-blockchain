import Grid from '@material-ui/core/Grid';
import React, { Fragment } from 'react';
import { getUser } from '../../helpers/token';
import PostGrid from '../Grid/PostGrid';

const Posts = () => {
  return (
    <Fragment>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        className="pt-1 pb-3"
      >
        <PostGrid
          query={{ author: getUser(), limit: 10 }}
          grid={{ lg: 8, md: 10, sm: 11, xs: 12 }}
          cardHeight={140}
          poststyle="list"
          warnWhenHidden
        />
      </Grid>
    </Fragment>
  );
};

export default Posts;
