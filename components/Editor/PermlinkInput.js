import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { invalidPermlink } from '../../helpers/regex';

const PermlinkInput = props => {
  const { data, onChange } = props;

  const [value, setValue] = useState(props.data);
  const [timer, setTimer] = useState(undefined);

  useEffect(() => {
    if (!value) setValue(data);
  }, [props]);

  const triggerChange = newval => () => {
    onChange(newval);
  };

  const handleChange = () => event => {
    setTimer(clearTimeout(timer));

    setValue(event.target.value.toLowerCase());

    setTimer(setTimeout(triggerChange(event.target.value.toLowerCase()), 1000));
  };

  return (
    <TextField
      fullWidth
      multiline
      error={value && value.length > 2 && value.match(invalidPermlink)}
      inputProps={{
        maxLength: 255,
      }}
      id="standard-name"
      value={value}
      placeholder={props.placeholder}
      label="Custom permlink"
      onChange={handleChange('name')}
      margin="normal"
    />
  );
};

PermlinkInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PermlinkInput;
