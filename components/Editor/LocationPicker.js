import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import MapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { MAPBOX_TOKEN } from '../../config';
import { round } from '../../helpers/math';
import MapMarker from '../Maps/Marker';
import './react-map-gl-geocoder/react-map-gl-geocoder.css';

class LocationPickerDialog extends Component {
  state = {
    width: 200,
    height: 200,
    viewport: {
      latitude: 30,
      longitude: 0,
      zoom: 1,
      bearing: 0,
      pitch: 0,
    },
    events: {},
    address: {},
  };

  mapRef = React.createRef();

  componentDidMount() {
    const width = document.getElementById('container').clientWidth;
    const height = document.getElementById('container').clientHeight;
    this.setState({ width, height });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  pickDetails = () => {
    if (this.props.value) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.props.value.latitude}&lon=${this.props.value.longitude}&accept-language=en`,
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.setState({ address: data.address || {} });
        });
    }
  };

  onMarkerDragEnd = event => {
    this.logDragEvent('onDragEnd', event);
    this.props.setLocation({
      longitude: round(event.lngLat[0], 6),
      latitude: round(event.lngLat[1], 6),
    });
    this.setState({ address: {} });
    this.props.setLocationCategory(undefined);
    this.pickDetails();
  };

  updateViewport = viewport => {
    this.setState({ viewport });
  };

  resize = () => {
    this.handleViewportChange({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  handleViewportChange = viewport => {
    if (viewport.longitude && viewport.longitude) {
      this.props.setLocation({
        latitude: round(viewport.latitude, 6),
        longitude: round(viewport.longitude, 6),
      });
      this.setState({ address: {} });
      this.props.setLocationCategory(undefined);
      this.pickDetails();
    }
    this.setState(prevState => ({
      viewport: { ...prevState.viewport, ...viewport },
    }));
  };

  //   Faster speed
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };

  setCategory = event => {
    this.props.setLocationCategory(event.target.value);
  };

  logDragEvent(name, event) {
    this.setState(prevState => ({
      events: {
        ...prevState.events,
        [name]: event.lngLat,
      },
    }));
  }

  render() {
    const { address } = this.state;
    const categories = {
      country: address.country,
      subdivision:
        address.state ||
        address.region ||
        address.state_district ||
        address.county,
      city: address.city || address.town,
      suburb: address.city_district || address.suburb || address.neighbourhood,
    };
    const { viewport } = this.state;
    const marker = this.props.value;
    viewport.width = this.state.width;
    viewport.height = this.state.height;
    return (
      <Fragment>
        <div id="container" style={{ height: '350px' }}>
          <MapGL
            mapStyle={
              this.props.dark ? 'mapbox://styles/mapbox/dark-v9' : undefined
            }
            scrollZoom={false}
            ref={this.mapRef}
            {...viewport}
            onViewportChange={this.updateViewport}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          >
            <Geocoder
              mapRef={this.mapRef}
              onViewportChange={this.handleGeocoderViewportChange}
              mapboxApiAccessToken={MAPBOX_TOKEN}
            />
            <Marker
              longitude={marker ? marker.longitude : 0}
              latitude={marker ? marker.latitude : 30}
              offsetTop={-20}
              offsetLeft={-10}
              draggable
              onDragEnd={this.onMarkerDragEnd}
            >
              <MapMarker />
            </Marker>
            <div className="nav">
              <NavigationControl
                onViewportChange={this.updateViewport}
                showCompass={false}
              />
              <GeolocateControl
                onViewportChange={this.handleViewportChange}
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation
              />
            </div>
            <style jsx>{`
              @media (min-width: 577px) {
                .nav {
                  position: absolute;
                  top: 0;
                  left: 0;
                  padding: 10px;
                }
              }
              @media (max-width: 576px) {
                .nav {
                  position: absolute;
                  top: 0;
                  left: 0;
                  padding: 70px 0 0 10px;
                }
              }
            `}</style>
          </MapGL>
        </div>
        {categories.subdivision && (
          <div className="container pt-5">
            <RadioGroup
              aria-label="location-category"
              name="location-category"
              value={this.props.locationCategory}
              onChange={this.setCategory}
            >
              <FormLabel component="legend">
                What describes the location of your post best?
              </FormLabel>
              <FormControlLabel
                value="country"
                control={<Radio />}
                label={categories.country}
              />
              <FormControlLabel
                value="subdivision"
                control={<Radio />}
                label={`${categories.subdivision}, ${categories.country}`}
              />
              {categories.city && (
                <FormControlLabel
                  value="city"
                  control={<Radio />}
                  label={`${categories.city}, ${categories.subdivision}, ${categories.country}`}
                />
              )}
              {categories.city && categories.suburb && (
                <FormControlLabel
                  value="suburb"
                  control={<Radio />}
                  label={`${categories.suburb}, ${categories.city}, ${categories.subdivision}, ${categories.country}`}
                />
              )}
            </RadioGroup>
          </div>
        )}
      </Fragment>
    );
  }
}

LocationPickerDialog.defaultProps = {
  locationCategory: undefined,
  dark: false,
};

LocationPickerDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  onPick: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.any).isRequired,
  setLocation: PropTypes.func.isRequired,
  setLocationCategory: PropTypes.func.isRequired,
  locationCategory: PropTypes.string,
  dark: PropTypes.bool,
};

export default LocationPickerDialog;
