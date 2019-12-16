import Button from '@material-ui/core/Button';
import { teal } from '@material-ui/core/colors';
// import Link from '../../lib/Link';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import {
  nameFromCC,
  randomCountry,
  slugFromCC,
} from '../../helpers/countryCodes';
import { GET_POSTS } from '../../helpers/graphql/posts';
import Link from '../../lib/Link';
import HeaderCard from '../General/HeaderCard';
import PostPreview from '../Post/PostPreview';

const DiscoverCountry = () => {
  const country_code = randomCountry;
  const country_name = nameFromCC(country_code);
  const countryslug = slugFromCC(country_code);
  return (
    <Fragment>
      <Query
        query={GET_POSTS}
        variables={{
          country_code,
          limit: 5,
          min_curation_score: 9000,
        }}
      >
        {({ data, loading, error }) => {
          if (loading || error || data.post === null) {
            return <Fragment />;
          }
          return (
            <Fragment>
              <HeaderCard
                noborder
                title={`Discover ${country_name}`}
                titlesize="h5"
                background={teal[600]}
                content={
                  <div>
                    {data.posts.map(post => {
                      return (
                        <PostPreview
                          author={post.author}
                          permlink={post.permlink}
                          img_url={post.img_url}
                          title={post.title}
                          divider
                        />
                      );
                    })}
                    <div className="text-center pt-3 pb-3">
                      <Link
                        color="textPrimary"
                        as={`/destinations/${countryslug}`}
                        href={`/destinations?country=${countryslug}`}
                      >
                        <Button variant="contained" color="primary">
                          <span className="text-light">Explore More</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                }
              />
            </Fragment>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default DiscoverCountry;
