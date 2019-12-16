import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, red } from '@material-ui/core/colors';
import FormLabel from '@material-ui/core/FormLabel';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { customJson } from '../../../helpers/actions';
import {
  CONTEST_IS_OPTED_IN,
  CONTEST_OPT_IN,
} from '../../../helpers/graphql/contest';
import graphQLClient from '../../../helpers/graphQLClient';
import { getRoles } from '../../../helpers/token';
import HeaderCard from '../../General/HeaderCard';

const redTheme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const greenTheme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const OptIn = props => {
  const [optedIn, setOptedIn] = useState(undefined);
  const [querying, setQuerying] = useState(false);

  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      props.enqueueSnackbar(notification.message, { variant });
    }
  };

  const broadcast = transactionId => {
    const variables = {
      optedIn: !optedIn,
      transactionId,
    };
    graphQLClient(CONTEST_OPT_IN, variables)
      .then(res => {
        if (res && res.contestOptIn) {
          if (res.contestOptIn.success) setOptedIn(!optedIn);
        }
        setQuerying(false);
      })
      .catch(err => {
        newNotification({
          success: false,
          message:
            err.message === 'Failed to fetch'
              ? 'Network Error. Are you online?'
              : `Opt-in failed: ${err.message}`,
        });
      });
  };

  const broadcastJson = () => {
    setQuerying(true);
    const roles = getRoles();
    if (roles && roles.indexOf('easylogin') === -1) {
      const payload = {
        contest: 'sf4',
      };
      const id = optedIn ? 'tf_contest_opt_out' : 'tf_contest_opt_in';
      customJson(payload, id).then(result => {
        if (result && result.transactionId) broadcast(result.transactionId);
        else setQuerying(false);
      });
    } else {
      // If easylogin is used, the custom json is broadcasted by the API
      broadcast('easylogin');
    }
  };

  return (
    <>
      <Query fetchPolicy="network-only" query={CONTEST_IS_OPTED_IN}>
        {({ data }) => {
          if (!querying && data && data.contestIsOptedIn !== undefined) {
            if (!optedIn) setOptedIn(data.contestIsOptedIn);
            return (
              <>
                <>
                  <HeaderCard
                    title={
                      (optedIn &&
                        'You are Participating in the Steemfest Contest') ||
                      'Opt in to Participate'
                    }
                    background={(optedIn && green[600]) || red[600]}
                    content={
                      <>
                        <FormLabel component="legend" className="pt-4">
                          {(optedIn &&
                            'By participating, you agree that the ticket can only be used by yourself and not be sold. If you cannot attend Steemfest, you can opt out of the contest by clicking the button below.') ||
                            'Click the button to opt in to participate in the Steemfest contest. By participating, you agree that the ticket can only be used by yourself and not be sold.'}
                        </FormLabel>
                        <MuiThemeProvider
                          theme={(optedIn && redTheme) || greenTheme}
                        >
                          {(!querying && (
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={broadcastJson}
                            >
                              {(optedIn && 'Opt Out') || 'Opt In'}
                            </Button>
                          )) || <CircularProgress />}
                        </MuiThemeProvider>
                      </>
                    }
                  />
                </>
              </>
            );
          }
          return <CircularProgress />;
        }}
      </Query>
    </>
  );
};

export default withSnackbar(OptIn);
