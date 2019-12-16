import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { useState } from 'react';

const PasswordPicker = props => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl fullWidth error={!props.isValid}>
        <InputLabel htmlFor="adornment-password">{props.label}</InputLabel>
        <Input
          autoFocus={props.autofocus}
          fullWidth
          id="adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={props.password}
          onChange={res => props.setPassword(res.target.value)}
          onKeyPress={props.onKeyPress}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {props.helper && <FormHelperText>{props.helper}</FormHelperText>}
      </FormControl>
    </>
  );
};

PasswordPicker.defaultProps = {
  isValid: true,
};

export default PasswordPicker;
