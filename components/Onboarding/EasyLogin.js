import React from 'react';
import PasswordPicker from './PasswordPicker';

const EasyLogin = props => {
  const { pwstrength } = props;
  return (
    <>
      {
        // We don't require Uppercase letters, numbers, special chars etc -
        // passphrases are very secure as well, it's the user's choice
      }
      <div>
        <PasswordPicker
          autofocus
          label="Password"
          password={props.password}
          setPassword={props.setPassword}
          isValid={pwstrength.errors && pwstrength.errors.length === 0}
          helper={
            pwstrength.errors && pwstrength.errors.length > 0
              ? pwstrength.errors[0]
              : undefined
          }
        />
      </div>
      <div className="pt-2">
        <PasswordPicker
          label="Confirm password"
          password={props.passwordConfirm}
          setPassword={props.setPasswordConfirm}
          helper={
            props.password &&
            props.passwordConfirm &&
            props.password !== props.passwordConfirm &&
            'This needs to match your password'
          }
          isValid={
            !props.password ||
            !props.passwordConfirm ||
            props.password === props.passwordConfirm
          }
        />
      </div>
    </>
  );
};

export default EasyLogin;
