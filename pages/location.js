import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import PhotoDetailHeader from '../components/General/PhotoDetailHeader';
import PostGrid from '../components/Grid/PostGrid';
import Header from '../components/Header/Header';
import { slugFromCC } from '../helpers/countryCodes';

const LocationPage = props => {
  const [topic, setTopic] = useState(undefined);

  const { country_code, subdivision, city } = props;

  const query = {
    location_box: props.location_box,
    country_code: props.country_code,
    orderby: 'curation_score DESC, total_votes DESC',
    orderdir: '',
    limit: 9,
  };
  if (topic) query.tags = topic;

  return (
    <Fragment>
      <Header active="location" />
      <PhotoDetailHeader
        noIndex
        noEdit
        query={{
          search: props.formatted_address,
          country_code,
          subdivision,
          city,
        }}
        title={props.formatted_address}
        countrySlug={slugFromCC(props.country_code)}
        topic={topic}
        setTopic={setTopic}
      />
      <div className="pb-2">
        <div className="container" id="containerInvisibleOnMobile">
          <PostGrid
            active="destination"
            query={query}
            grid={{ lg: 4, md: 4, sm: 6, xs: 12 }}
            cardHeight={200}
            poststyle="grid"
          />
        </div>
      </div>
      <style>{`
        @media (max-width: 992px) {
          #containerInvisibleOnMobile {
            padding: 0;
            margin: 0;
          }
        }
        `}</style>
    </Fragment>
  );
};

LocationPage.getInitialProps = props => {
  const { formatted_address, country_code, subdivision, city } = props.query;
  const locations = props.query.location_box.split(',');
  const location_box = [];
  locations.forEach(el => {
    location_box.push(parseFloat(el));
  });

  return {
    location_box,
    formatted_address,
    country_code,
    subdivision,
    city,
  };
};

LocationPage.defaultProps = {
  query: undefined,
};

LocationPage.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  query: PropTypes.objectOf(PropTypes.string),
  formatted_address: PropTypes.string.isRequired,
  location_box: PropTypes.arrayOf(PropTypes.number).isRequired,
  country_code: PropTypes.string.isRequired,
};

export default LocationPage;
