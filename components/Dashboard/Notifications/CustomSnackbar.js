// https://material-ui.com/demos/snackbars/#snackbars

import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  root: {
    minWidth: '200px !important',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes.root, classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  );
}

const CustomSnackbar = withStyles(styles1)(MySnackbarContent);

MySnackbarContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default CustomSnackbar;
