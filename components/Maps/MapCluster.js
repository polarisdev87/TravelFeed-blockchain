import { teal } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import { MAPBOX_TOKEN } from '../../config';
import '../Editor/react-map-gl-geocoder/react-map-gl-geocoder.css';
import Cluster from './Cluster';
import MapCard from './MapCard';
import MarkerSmall from './MarkerSmall';
import PinGroup from './PinGroup';

const Geocoder = dynamic(() => import('react-map-gl-geocoder'), {
  ssr: false,
});

const fitBounds = (bounds, viewport) =>
  new WebMercatorViewport(viewport).fitBounds(bounds);

class MapCluster extends Component {
  state = {
    viewport: {
      width: 1400,
      height: 700,
      latitude: 0,
      longitude: 0,
      zoom: 1,
    },
    map: undefined,
  };

  mapRef = React.createRef();

  componentDidMount() {
    const width = document.body.clientWidth;
    const height = this.props.getHeightFromContainer
      ? document.getElementById('container').clientHeight
      : 500;
    let zoom = this.props.zoom || 1;
    if (this.props.bbox)
      zoom = fitBounds(
        [
          [this.props.bbox[0], this.props.bbox[1]],
          [this.props.bbox[2], this.props.bbox[3]],
        ],
        {
          width,
          height,
        },
      ).zoom;
    this.setState({
      viewport: {
        width,
        height,
        latitude: this.props.latitude || 25,
        longitude: this.props.longitude || 10,
        zoom,
      },
    });
  }

  setPopupList = popupInfo => {
    this.setState({ popupInfo });
  };

  handleViewportChange = viewport => {
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

  addDataLayer = (map, data) => {
    map.addLayer({
      id: 'route',
      type: 'fill',
      source: {
        type: 'geojson',
        data,
      },
      layout: {},
      paint: {
        'fill-color': teal[600],
        'fill-opacity': 0.4,
      },
    });
  };

  renderPopup() {
    const { popupInfo } = this.state;
    return (
      popupInfo && (
        <>
          <Popup
            offsetLeft={popupInfo.posts === undefined ? 0 : 3}
            offsetTop={popupInfo.posts === undefined ? 0 : 8}
            closeButton={false}
            captureScroll
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick
            // onClose={() => this.setState({ popupInfo: undefined })}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 9999,
              }}
            >
              <IconButton
                onClick={() => this.setState({ popupInfo: undefined })}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <MapCard info={popupInfo} />
          </Popup>
        </>
      )
    );
  }

  render() {
    const { map, viewport } = this.state;
    return (
      <div
        id="container"
        style={{
          height: this.props.height,
          width: '100%',
          position: this.props.position,
        }}
      >
        <ReactMapGL
          scrollZoom={this.props.scrollZoom}
          mapStyle={
            this.props.dark ? 'mapbox://styles/mapbox/dark-v9' : undefined
          }
          onViewportChange={vp => this.setState({ viewport: vp })}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          ref={this.mapRef}
          onLoad={() => this.setState({ map: this.mapRef.current.getMap() })}
          {...viewport}
        >
          {map && (
            <>
              {this.props.dataLayer &&
                this.addDataLayer(map, this.props.dataLayer)}
              {this.props.showControls && (
                <Geocoder
                  mapRef={this.mapRef}
                  onViewportChange={this.handleGeocoderViewportChange}
                  mapboxApiAccessToken={MAPBOX_TOKEN}
                />
              )}
              <Cluster
                map={map}
                element={clusterProps => (
                  <PinGroup
                    {...clusterProps}
                    setPopupList={this.setPopupList}
                  />
                )}
              >
                {this.props.data &&
                  this.props.data.map(point => {
                    if (point.longitude !== null) {
                      return (
                        <Marker
                          key={`${point.author}=${point.permlink}`}
                          longitude={point.longitude}
                          latitude={point.latitude}
                          author={point.author}
                          permlink={point.permlink}
                          title={point.title}
                          img_url={point.img_url}
                        >
                          <MarkerSmall
                            size={20}
                            onClick={() => this.setState({ popupInfo: point })}
                          />{' '}
                        </Marker>
                      );
                    }
                    return <></>;
                  })}
              </Cluster>
            </>
          )}
          {this.renderPopup()}
          <div className="nav">
            <NavigationControl
              onViewportChange={this.updateViewport}
              showCompass={false}
            />
            {this.props.showControls && (
              <GeolocateControl
                onViewportChange={this.handleViewportChange}
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation
              />
            )}
          </div>
          <style jsx>{`
            .nav {
              position: absolute;
              top: 0;
              left: 0;
              padding: 10px;
            }
          `}</style>
        </ReactMapGL>
      </div>
    );
  }
}

MapCluster.defaultProps = {
  dark: false,
  position: 'fixed',
  height: '100%',
  scrollZoom: true,
  showControls: true,
  dataLayer: undefined,
};

MapCluster.propTypes = {
  dark: PropTypes.bool,
  dataLayer: PropTypes.objectOf(PropTypes.any),
  scrollZoom: PropTypes.bool,
  showControls: PropTypes.bool,
  position: PropTypes.string,
  height: PropTypes.string,
  data: PropTypes.array.isRequired,
};

export default MapCluster;
