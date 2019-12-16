import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const Checks = props => {
  return (
    <Fragment>
      <FormLabel component="legend">
        Please check that your post meets the TravelFeed quality requirements:
      </FormLabel>
      <FormGroup>
        {props.checklist.map(c => {
          if (!c.hide) {
            return (
              <FormControlLabel
                control={<Checkbox />}
                label={c.label}
                checked={c.checked}
              />
            );
          }
          return <Fragment />;
        })}
      </FormGroup>
    </Fragment>
  );
};

Checks.propTypes = {
  checklist: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Checks;
