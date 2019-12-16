import { useTheme } from '@material-ui/styles';
import React, { Fragment, useEffect, useState } from 'react';
import { Query } from 'react-apollo';
import Head from '../components/Header/Head';
import Header from '../components/Header/Header';
import Map from '../components/Maps/MapCluster';
import { MAPBOX_TOKEN } from '../config';
import { GET_PLACES } from '../helpers/graphql/places';

const MapPage = props => {
  const [bbox, setBbox] = useState(undefined);
  const [center, setCenter] = useState(undefined);

  const theme = useTheme();

  useEffect(() => {
    if (props.search) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          props.search,
        )}.json?limit=1&language=en-GB&access_token=${MAPBOX_TOKEN}`,
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data && data.features && data.features.length > 0) {
            setBbox(data.features[0].bbox);
            setCenter(data.features[0].center);
          }
        });
    }
  }, [props]);

  const title = 'Map';
  return (
    <Fragment>
      <Header subheader={title} active="map" />
      <Head title="Travel Blog Map" includeMapbox />
      {
        // Fetches all posts with a location and a minimum upvote of 50%.
        // Not-curated posts are not displayed since they are usually
        // less relevant.
      }
      <Query query={GET_PLACES}>
        {({ data }) => {
          if (data && data.places) {
            return (
              <>
                {(props.search && !center && <></>) || (
                  <Map
                    data={data && data.places}
                    dark={theme.palette.type === 'dark'}
                    latitude={
                      center && center.length > 0 ? center[1] : props.latitude
                    }
                    longitude={
                      center && center.length > 0 ? center[0] : props.longitude
                    }
                    zoom={props.zoom}
                    bbox={bbox}
                    getHeightFromContainer
                  />
                )}
              </>
            );
          }
          return <Fragment />;
        }}
      </Query>
    </Fragment>
  );
};

MapPage.getInitialProps = props => {
  const latitude = Number(props.query.latitude);
  const longitude = Number(props.query.longitude);
  const zoom = Number(props.query.zoom);
  const { search } = props.query;
  return { latitude, longitude, zoom, search };
};

export default MapPage;
