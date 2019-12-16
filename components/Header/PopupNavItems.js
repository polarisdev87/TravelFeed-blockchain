import React from 'react';
import { Query } from 'react-apollo';
import { GET_FEATURED_LOCATIONS } from '../../helpers/graphql/locations';
import PopupNavCard from './PopupNavCard';

const PopupNavItem = props => {
  const { tags, countries, places } = props;
  return (
    <>
      <Query
        query={GET_FEATURED_LOCATIONS}
        variables={{ tags, countries, places }}
      >
        {({ data, loading, error }) => {
          return (
            <div className="container-fluid pb-4">
              <div className="row">
                {(data &&
                  data.featuredLocations &&
                  data.featuredLocations.map(item => {
                    return <PopupNavCard data={item} />;
                  })) || (
                  <>
                    <PopupNavCard />
                    <PopupNavCard />
                    <PopupNavCard />
                    <PopupNavCard />
                    <PopupNavCard />
                    <PopupNavCard />
                    <PopupNavCard />
                    <PopupNavCard />
                  </>
                )}
              </div>
            </div>
          );
        }}
      </Query>
    </>
  );
};

export default PopupNavItem;
