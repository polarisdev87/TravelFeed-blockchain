import red from '@material-ui/core/colors/red';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import accountExists from '../../helpers/accountExists';

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const BeneficiaryInput = props => {
  const [username, setUsername] = useState('');
  const [percentage, setPercentage] = useState(1);

  const { loading, setLoading } = props;

  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      props.enqueueSnackbar(notification.message, { variant });
    }
  };

  const handleUsernameChange = () => event => {
    setUsername(event.target.value.toLowerCase());
  };

  const handlePercentageChange = () => event => {
    setPercentage(event.target.value);
  };

  const handleBeneficiaryAdd = () => {
    const beneficiaries = props.value;
    // Verify username inputLength
    if (beneficiaries.length > 7) {
      newNotification({
        message: 'You cannot enter more than 8 beneficiaries.',
        success: false,
      });
      return;
    }
    // Verify username inputLength
    if (username.length < 1) {
      newNotification({
        message: 'Please enter a username',
        success: false,
      });
      return;
    }
    //   Verify percentage
    if (percentage > 100 || percentage < 1) {
      newNotification({
        message: 'The percentage must be in the range of 1 and 99',
        success: false,
      });
      return;
    }
    // Verify that the total percentage is under 100%
    let percentage_total = Number(percentage);
    beneficiaries.forEach(b => {
      percentage_total += Number(b.percentage);
    });
    if (percentage_total > 100) {
      newNotification({
        message: 'The total beneficiary percentage cannot be over 100%',
        success: false,
      });
      return;
    }
    //  Check if account already exists in list
    let duplicate = false;
    beneficiaries.forEach(b => {
      if (b.username === username) duplicate = true;
    });
    if (duplicate) {
      newNotification({
        message: 'This account already is in your beneficiary list.',
        success: false,
      });
      return;
    }
    setLoading(true);
    // Check if Steem account exists
    accountExists(username).then(res => {
      if (res) {
        beneficiaries.push({ username, percentage });
        props.onChange(beneficiaries);
        setUsername('');
        setPercentage(1);
      } else
        newNotification({
          message: 'Username does not exist',
          success: false,
        });
      setLoading(false);
    });
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') handleBeneficiaryAdd();
  };

  const handleBeneficiaryRemove = uname => {
    let beneficiaries = props.value;
    beneficiaries = beneficiaries.filter(item => item.username !== uname);
    props.onChange(beneficiaries);
  };

  return (
    <div style={{ overflowX: 'auto', wordWrap: 'normal', wordBreak: 'normal' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">Username</TableCell>
            <TableCell padding="checkbox">Reward</TableCell>
            <TableCell padding="checkbox" />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.value.map(b => (
            <TableRow hover key={b.username}>
              <TableCell padding="checkbox">{b.username}</TableCell>
              <TableCell padding="checkbox">{b.percentage}%</TableCell>
              <TableCell padding="checkbox">
                <MuiThemeProvider theme={theme}>
                  <IconButton
                    color="primary"
                    onClick={() => handleBeneficiaryRemove(b.username)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </MuiThemeProvider>
              </TableCell>
            </TableRow>
          ))}
          <TableRow key="input">
            <TableCell padding="checkbox">
              <TextField
                value={username}
                placeholder="username"
                onKeyPress={handleKeyPress}
                onChange={handleUsernameChange('name')}
              />
            </TableCell>
            <TableCell padding="checkbox">
              <TextField
                onKeyPress={handleKeyPress}
                inputProps={{ min: '1', max: '100', step: '1' }}
                type="number"
                value={percentage}
                onChange={handlePercentageChange('name')}
              />
            </TableCell>
            <TableCell padding="checkbox">
              <IconButton
                color="primary"
                disabled={loading}
                onClick={() => handleBeneficiaryAdd()}
              >
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <FormLabel component="legend" className="pt-4">
        Unlike other platforms, we do not automatically set beneficiaries and do
        not take anything from your rewards without asking you, but if you would
        like to support us, you can{' '}
        <Typography
          color="primary"
          className="cpointer"
          role="button"
          display="inline"
          onClick={() => {
            setUsername('travelfeed');
            setPercentage(5);
          }}
          onKeyPress={() => {
            setUsername('travelfeed');
            setPercentage(5);
          }}
          tabIndex={0}
        >
          set travelfeed as beneficiary
        </Typography>{' '}
        of your post and donate a part of your rewards.
      </FormLabel>
    </div>
  );
};

BeneficiaryInput.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withSnackbar(BeneficiaryInput);
