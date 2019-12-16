import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Query } from 'react-apollo';
import { nameFromCC, slugFromCC } from '../../helpers/countryCodes';
import { GET_POSTS } from '../../helpers/graphql/posts';
import Link from '../../lib/Link';
import PostPreview from './PostPreview';
import SimilarPostCard from './SimilarPostCard';

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: 12,
    padding: 0,
    margin: 0,
  },
}));

const SimilarPosts = props => {
  const classes = useStyles();

  const { country_code } = props;

  const slug = slugFromCC(country_code);

  return (
    <>
      <Query
        query={GET_POSTS}
        variables={{
          orderby: 'random',
          country_code,
          min_curation_score: 5000,
          limit: 4,
        }}
      >
        {({ data }) => {
          if (data && data.posts) {
            return (
              <>
                <div className="d-xl-block d-lg-block d-md-block d-sm-none d-none">
                  <Typography
                    align="center"
                    variant="h4"
                    className="pt-5 pb-2"
                    gutterBottom
                  >
                    <Link
                      color="inherit"
                      href={`/destinations?country=${slug}`}
                      as={`/destinations/${slug}`}
                    >
                      More from {nameFromCC(country_code)}
                    </Link>
                  </Typography>
                  <div className="container">
                    <div className="row">
                      {data.posts.map((post, i) => {
                        const {
                          author,
                          permlink,
                          title,
                          img_url,
                          subdivision,
                          city,
                        } = post;
                        return (
                          <>
                            <div
                              className={`col-xl-3 col-lg-3 col-md-4 m-0 p-0 ${i >
                                2 &&
                                'd-xl-block d-lg-block d-md-none d-sm-none d-none'}`}
                              key={permlink}
                            >
                              <SimilarPostCard
                                slug={slug}
                                post={{
                                  author,
                                  permlink,
                                  title,
                                  img_url,
                                  subdivision,
                                  city,
                                }}
                                padding={i > 0 ? `pl-2` : ''}
                                cardHeight="200"
                              />
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="d-xl-none d-lg-none d-md-none d-sm-block d-block">
                  <Card className={classes.card}>
                    <Typography
                      gutterBottom
                      align="center"
                      variant="h5"
                      className="pt-4"
                    >
                      <Link
                        color="inherit"
                        href={`/destinations?country=${slug}`}
                        as={`/destinations/${slug}`}
                      >
                        More from {nameFromCC(country_code)}
                      </Link>
                    </Typography>
                    {data.posts.map((post, i) => {
                      const { author, permlink, title, img_url } = post;
                      return (
                        <>
                          <PostPreview
                            key={permlink}
                            author={author}
                            permlink={permlink}
                            title={title}
                            img_url={img_url}
                            divider={i < data.posts.length - 1}
                          />
                        </>
                      );
                    })}
                  </Card>
                </div>
              </>
            );
          }
          return <></>;
        }}
      </Query>
    </>
  );
};

export default SimilarPosts;
