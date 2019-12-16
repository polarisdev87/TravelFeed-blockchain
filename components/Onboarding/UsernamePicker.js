import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import accountExists from '../../helpers/accountExists';
import steem from '../../helpers/steem';

const UsernameInput = props => {
  const { onChange } = props;

  const [value, setValue] = useState(undefined);
  const [timer, setTimer] = useState(undefined);
  const [isValid, setValid] = useState(true);

  const triggerChange = newval => () => {
    accountExists(newval).then(res => {
      if (res) {
        setValid(false);
        onChange('');
      } else {
        setValid(true);
        if (steem.utils.validateAccountName(newval) == null) onChange(newval);
        else onChange('');
      }
    });
  };

  const handleChange = () => event => {
    onChange('');
    setValid(undefined);
    setTimer(clearTimeout(timer));

    setValue(event.target.value.toLowerCase());

    setTimer(setTimeout(triggerChange(event.target.value.toLowerCase()), 1000));
  };

  return (
    <FormControl
      fullWidth
      error={
        (value && steem.utils.validateAccountName(value) !== null) ||
        isValid === false
      }
    >
      <FormGroup>
        <TextField
          autoFocus
          error={
            (value && steem.utils.validateAccountName(value) !== null) ||
            isValid === false
          }
          fullWidth
          inputProps={{
            maxLength: 255,
          }}
          id="standard-name"
          value={value}
          placeholder={props.placeholder}
          label="Username"
          onChange={handleChange('name')}
          margin="normal"
        />
        <FormHelperText>
          {(isValid === false && 'Username already exists') ||
            steem.utils.validateAccountName(value) ||
            (isValid === undefined && 'Checking availability...')}
        </FormHelperText>
      </FormGroup>
    </FormControl>
  );
};

UsernameInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UsernameInput;
