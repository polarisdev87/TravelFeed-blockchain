// TODO: Create content for /destinations, especially for mobile view
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import PhotoDetailHeader from '../components/General/PhotoDetailHeader';
import PostGrid from '../components/Grid/PostGrid';
import Head from '../components/Header/Head';
import Header from '../components/Header/Header';
import PopupNavItems from '../components/Header/PopupNavItems';
import { ccFromSlug, nameFromSlug } from '../helpers/countryCodes';

const DestinationsPage = props => {
  const [topic, setTopic] = useState(undefined);

  const { country } = props;
  const countryName = nameFromSlug(country);
  const country_code = ccFromSlug(country);
  const { subdivision } = props;
  const { city } = props;
  const { suburb } = props;
  if (!country_code)
    return (
      <Fragment>
        <Head
          title="Destinations"
          description="Discover the best travel destinations on TravelFeed."
        />
        <Header subheader="Destinations" active="destinations" />
        <Typography variant="h4" className="text-center p-3">
          Popular Countries
        </Typography>
        <PopupNavItems countries />
        <Typography variant="h4" className="text-center p-3">
          Popular Places
        </Typography>
        <PopupNavItems places />
      </Fragment>
    );
  const title = `${(suburb && `${suburb}, ${city}`) ||
    (city && `${city}, ${countryName}`) ||
    (subdivision && `${subdivision}, ${countryName}`) ||
    countryName}`;
  const query = {
    limit: 9,
    orderby: 'curation_score DESC, total_votes DESC',
    orderdir: '',
    country_code,
    subdivision,
    city,
    suburb,
  };
  if (topic) query.tags = topic;
  return (
    <Fragment>
      <Header subheader={title} active="destination" />
      <PhotoDetailHeader
        countrySlug={country}
        query={{ country_code, subdivision, city }}
        title={title}
        topic={topic}
        setTopic={setTopic}
      />
      <div className="pb-2">
        <div className="container pb-2" id="containerInvisibleOnMobile">
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

DestinationsPage.getInitialProps = props => {
  const { country, subdivision, city, suburb } = props.query;
  return {
    country,
    subdivision,
    city,
    suburb,
  };
};

DestinationsPage.defaultProps = {
  subdivision: undefined,
  city: undefined,
  suburb: undefined,
  query: undefined,
};

DestinationsPage.propTypes = {
  country: PropTypes.string.isRequired,
  subdivision: PropTypes.string,
  city: PropTypes.string,
  suburb: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  query: PropTypes.objectOf(PropTypes.string),
};

export default DestinationsPage;
