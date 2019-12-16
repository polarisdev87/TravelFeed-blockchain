import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React from 'react';

const PayoutTypeSelector = props => {
  const handleChange = value => {
    props.onChange(value.target.value);
  };

  return (
    <FormControl>
      <InputLabel htmlFor="author-rewards">Author rewards</InputLabel>
      <Select value={props.value} onChange={handleChange}>
        <MenuItem value={false}>50% liquid and 50% SP</MenuItem>
        <MenuItem value>100% Steem Power</MenuItem>
      </Select>
    </FormControl>
  );
};

PayoutTypeSelector.propTypes = {
  value: PropTypes.arrayOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PayoutTypeSelector;
