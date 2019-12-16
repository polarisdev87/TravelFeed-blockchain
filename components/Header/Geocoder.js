// https://github.com/Giners/mui-places-autocomplete/blob/master/demo/DemoGeocodeLatLong.jsx Copyright (c) 2017 Chris Austin
// Todo: Apply styles to search field, see https://material-ui.com/demos/app-bar/#app-bar-with-search-field
// Todo: Look into OSM alternative to google places (issues with privacy,
// at some point cost). Mapbox restricts their Geocoder to map queries (tos),
//  nominatim forbids autocomplete. Komoot photon, osmnames or pelias
//  (probably the best option, but complicated) could be considered.
import InputAdornment from '@material-ui/core/InputAdornment';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/styles';
import MUIPlacesAutocomplete, {
  geocodeBySuggestion,
} from 'mui-places-autocomplete';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

// https://stackoverflow.com/questions/49040092/material-ui-v1-input-focus-style-override
const styles = theme => ({
  input: props => ({
    borderRadius: theme.shape.borderRadius,
    width: props.width || '100%',
    height: (props.width && '65px') || '100%',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    color: 'white',
    padding: '5px',
    transition: 'width 0.3s',
  }),
  inputFocused: props => ({
    // Separate this part into it's own CSS class
    width: props.width || '120%',
    backgroundColor: fade(theme.palette.common.white, 0.25),
    transition: 'width 0.3s',
  }),
});

const createAutocompleteRequest = inputValue => {
  return {
    input: inputValue,
    types: ['(regions)'],
    language: 'en',
  };
};

const Geocoder = props => {
  // eslint-disable-next-line class-methods-use-this
  const onSuggestionSelected = suggestion => {
    // Once a suggestion has been selected by your consumer you can use the
    // utility geocoding
    // functions to get the latitude and longitude for the selected suggestion.
    geocodeBySuggestion(suggestion)
      .then(results => {
        if (results.length < 1) {
          return;
        }
        const result = results[0];
        // A location box is not exact since countries are usually not
        // rectangular, therefore a query for Germany would result in posts
        // from neighbouring countries to be returned as well. Unlike the
        // subdivision, the country-code is consistant to the database,
        // adding it to the query improves the accuracy
        let country_code;
        let subdivision;
        let city;
        result.address_components.forEach(adrcomp => {
          adrcomp.types.forEach(t => {
            if (t === 'country') {
              country_code = adrcomp.short_name.toLowerCase();
            } else if (
              t === 'administrative_area_level_1' ||
              t === 'colloquial_area'
            ) {
              // Manual geocoding overrides for mismatches between Google and Nominatim results
              subdivision = adrcomp.long_name;
              if (subdivision === 'Federal Territory of Kuala Lumpur')
                subdivision = 'Kuala Lumpur';
            } else if (
              t === 'administrative_area_level_2' ||
              t === 'locality'
            ) {
              city = adrcomp.long_name;
              if (city === 'Kuala Lumpur') city = undefined;
              else if (city === 'Beijing') city = undefined;
              else if (city === 'Government of Amsterdam') city = 'Amsterdam';
            }
          });
        });
        const args = `${country_code ? `&country_code=${country_code}` : ''}${
          subdivision ? `&subdivision=${encodeURIComponent(subdivision)}` : ''
        }${city ? `&city=${encodeURIComponent(city)}` : ''}`;
        let { bounds } = result.geometry;
        // Some exact locations have no boundary, so use the less exact viewport
        //  instead
        if (!bounds) {
          bounds = result.geometry.viewport;
        }
        const bound1 = bounds[Object.keys(bounds)[1]];
        const bound2 = bounds[Object.keys(bounds)[0]];
        Router.push(
          `/location?location_box=${bound1.g},${bound2.g},${bound1.h},${bound2.h}&formatted_address=${result.formatted_address}${args}`,
        );
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  const { classes } = props;
  return (
    <>
      <MUIPlacesAutocomplete
        textFieldProps={{
          InputProps: {
            autoFocus: props.autoFocus,
            placeholder: 'Search for a place',
            className: classes.input,
            classes: { focused: classes.inputFocused },
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="end">
                <SearchIcon className="text-light ml-1 mr-3" />
              </InputAdornment>
            ),
          },
        }}
        onSuggestionSelected={onSuggestionSelected}
        createAutocompleteRequest={createAutocompleteRequest}
        renderTarget={() => <></>}
      />
    </>
  );
};

Geocoder.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Geocoder);
