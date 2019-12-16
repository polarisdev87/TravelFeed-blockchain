// Todo: Add delete account to remove all of users data from our database
import { teal } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import { requestPostingAuthority } from '../../helpers/actions';
import { CHANGE_SETTINGS, GET_SETTINGS } from '../../helpers/graphql/settings';
import hasPostingAuthority from '../../helpers/hasPostingAuthority';
import { registerServiceWorker } from '../../helpers/notifications';
import { getRoles, getUser } from '../../helpers/token';
import HeaderCard from '../General/HeaderCard';
import UserContext from '../General/UserContext';
import LinkEasyLogin from './Settings/LinkEasyLogin';

const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Settings = props => {
  const { theme, setDarkMode, setLightMode } = useContext(UserContext);

  const useDarkMode = theme === 'dark';
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(true);
  const [showNSFW, setShowNSFW] = useState(false);
  const [useTfBlacklist, setUseTfBlacklist] = useState(true);
  const [notificationPermission, setNotificationPermission] = useState(false);
  const [trackFollows, setTrackFollows] = useState(false);
  const [trackMentions, setTrackMentions] = useState(false);
  const [trackReplies, setTrackReplies] = useState(false);
  const [trackCuration, setTrackCuration] = useState(false);
  const [trackUpdates, setTrackUpdates] = useState(false);
  const [useAdvancedEditorOptions, setUseAdvancedEditorOptions] = useState(
    false,
  );
  const [claimRewards, setClaimRewards] = useState(false);
  const [roles, setRoles] = useState(undefined);

  useEffect(() => {
    setRoles(getRoles());

    // https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web

    // Are Notifications supported in the service worker?
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
      return;
    }

    // Check the current Notification permission.
    // If its denied, it's a permanent block until the
    // user changes the permission
    if (Notification.permission === 'denied') {
      return;
    }

    // Check if push messaging is supported
    if (!('PushManager' in window)) {
      return;
    }
    setNotificationPermission(Notification.permission === 'granted');
  }, []);

  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      const { enqueueSnackbar } = props;
      enqueueSnackbar(notification.message, { variant });
    }
  };

  const handleCheckboxChange = (name, changeSettings) => event => {
    if (name === 'useDarkMode') {
      if (useDarkMode) setLightMode();
      else setDarkMode();
    } else if (name === 'showNSFW') {
      setShowNSFW(event.target.checked);
    } else if (name === 'useTfBlacklist') {
      setUseTfBlacklist(event.target.checked);
    } else if (name === 'useAdvancedEditorOptions') {
      setUseAdvancedEditorOptions(event.target.checked);
    } else if (name === 'trackFollows') {
      setTrackFollows(event.target.checked);
    } else if (name === 'trackMentions') {
      setTrackMentions(event.target.checked);
    } else if (name === 'trackReplies') {
      setTrackReplies(event.target.checked);
    } else if (name === 'trackCuration') {
      setTrackCuration(event.target.checked);
    } else if (name === 'trackUpdates') {
      setTrackUpdates(event.target.checked);
    } else if (name === 'claimRewards') {
      const { checked } = event.target;
      setClaimRewards(checked);
      if (event.target.checked) {
        hasPostingAuthority(getUser()).then(res => {
          if (res) changeSettings();
          else if (window && !window.steem_keychain) {
            newNotification({
              message:
                'You need to give posting authority to @travelfeed.app to enable automated rewards claiming.',
              success: false,
            });
            setClaimRewards(false);
          } else {
            newNotification({
              message:
                'You need to give posting authority to @travelfeed.app to enable automated rewards claiming.',
              success: false,
            });
            requestPostingAuthority().then(postAuthRes => {
              if (postAuthRes.success) changeSettings();
              else {
                newNotification(res);
                setClaimRewards(false);
              }
            });
          }
        });
      }
    } else if (name === 'notificationPermission') {
      if (!notificationPermission)
        Notification.requestPermission(status => {
          setNotificationPermission(status === 'granted');
          registerServiceWorker();
        });
      setNotificationPermission(false);
    }
  };

  return (
    <Fragment>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        className="p-2"
      >
        <Grid item lg={7} md={8} sm={11} xs={12}>
          <HeaderCard
            title="Settings"
            background={teal[600]}
            content={
              <Query fetchPolicy="network-only" query={GET_SETTINGS}>
                {({ data }) => {
                  if (loaded === false && data && data.preferences) {
                    setLoaded(true);
                    setShowNSFW(data.preferences.showNSFW);
                    setUseTfBlacklist(data.preferences.useTfBlacklist);
                    setTrackFollows(data.preferences.trackFollows);
                    setTrackMentions(data.preferences.trackMentions);
                    setTrackReplies(data.preferences.trackReplies);
                    setTrackCuration(data.preferences.trackCuration);
                    setTrackUpdates(data.preferences.trackUpdates);
                    setUseAdvancedEditorOptions(
                      data.preferences.useAdvancedEditorOptions !== false,
                    );
                    setClaimRewards(data.preferences.claimRewards);
                    return <Fragment />;
                  }
                  return (
                    <Mutation
                      mutation={CHANGE_SETTINGS}
                      variables={{
                        showNSFW,
                        useTfBlacklist,
                        trackFollows,
                        trackMentions,
                        trackReplies,
                        trackCuration,
                        trackUpdates,
                        useAdvancedEditorOptions,
                        claimRewards,
                      }}
                    >
                      {(changeSettings, data) => {
                        if (data && data.loading && saved) {
                          setSaved(false);
                        }
                        if (data && data.error) {
                          newNotification({
                            success: false,
                            message: 'Network Error. Are you online?',
                          });
                        }
                        if (data && data.data && !saved) {
                          newNotification({
                            success: data.data.updatePreferences.success,
                            message: data.data.updatePreferences.message,
                          });
                          setSaved(true);
                        }
                        return (
                          <Fragment>
                            <FormControl fullWidth>
                              <FormGroup>
                                <FormControlLabel
                                  labelPlacement="end"
                                  control={
                                    <Switch
                                      checked={showNSFW}
                                      onChange={handleCheckboxChange(
                                        'showNSFW',
                                      )}
                                      onInput={changeSettings}
                                      value="showNSFW"
                                      color="primary"
                                    />
                                  }
                                  label="Show NSFW posts"
                                />

                                <FormControlLabel
                                  labelPlacement="end"
                                  control={
                                    <Switch
                                      checked={useTfBlacklist}
                                      onChange={handleCheckboxChange(
                                        'useTfBlacklist',
                                      )}
                                      onInput={changeSettings}
                                      value="useTfBlacklist"
                                      color="primary"
                                    />
                                  }
                                  label="Use TravelFeed blacklist"
                                />

                                <FormControlLabel
                                  labelPlacement="end"
                                  control={
                                    <Switch
                                      checked={useAdvancedEditorOptions}
                                      onChange={handleCheckboxChange(
                                        'useAdvancedEditorOptions',
                                      )}
                                      onInput={changeSettings}
                                      value="useAdvancedEditorOptions"
                                      color="primary"
                                    />
                                  }
                                  label="Advanced editor options"
                                />
                                <FormControlLabel
                                  labelPlacement="end"
                                  control={
                                    <Switch
                                      checked={claimRewards}
                                      onChange={handleCheckboxChange(
                                        'claimRewards',
                                        changeSettings,
                                      )}
                                      onInput={!claimRewards && changeSettings}
                                      value="claimRewards"
                                      color="primary"
                                    />
                                  }
                                  label="Automatically claim rewards"
                                />
                                <FormControlLabel
                                  labelPlacement="end"
                                  control={
                                    <Switch
                                      checked={useDarkMode}
                                      onChange={handleCheckboxChange(
                                        'useDarkMode',
                                      )}
                                      // onInput={changeSettings}
                                      // For now, dark mode is saved on the device only
                                      value="useDarkMode"
                                      color="primary"
                                    />
                                  }
                                  label="Use dark mode"
                                />
                                {(notificationPermission && (
                                  <>
                                    <FormControlLabel
                                      labelPlacement="end"
                                      control={
                                        <Switch
                                          checked={trackFollows}
                                          onChange={handleCheckboxChange(
                                            'trackFollows',
                                          )}
                                          color="primary"
                                          onInput={changeSettings}
                                        />
                                      }
                                      label="Notify for new followers"
                                    />
                                    <FormControlLabel
                                      labelPlacement="end"
                                      control={
                                        <Switch
                                          checked={trackMentions}
                                          onChange={handleCheckboxChange(
                                            'trackMentions',
                                          )}
                                          color="primary"
                                          onInput={changeSettings}
                                        />
                                      }
                                      label="Notify when mentioned"
                                    />
                                    <FormControlLabel
                                      labelPlacement="end"
                                      control={
                                        <Switch
                                          checked={trackReplies}
                                          onChange={handleCheckboxChange(
                                            'trackReplies',
                                          )}
                                          color="primary"
                                          onInput={changeSettings}
                                        />
                                      }
                                      label="Notify when someone replies to you"
                                    />
                                    <FormControlLabel
                                      labelPlacement="end"
                                      control={
                                        <Switch
                                          checked={trackCuration}
                                          onChange={handleCheckboxChange(
                                            'trackCuration',
                                          )}
                                          color="primary"
                                          onInput={changeSettings}
                                        />
                                      }
                                      label="Notify when your post is featured"
                                    />
                                    <FormControlLabel
                                      labelPlacement="end"
                                      control={
                                        <Switch
                                          checked={trackUpdates}
                                          onChange={handleCheckboxChange(
                                            'trackUpdates',
                                          )}
                                          color="primary"
                                          onInput={changeSettings}
                                        />
                                      }
                                      label="Receive notifications about TravelFeed updates"
                                    />
                                  </>
                                )) || (
                                  <FormControlLabel
                                    labelPlacement="end"
                                    control={
                                      <Switch
                                        checked={notificationPermission}
                                        onChange={handleCheckboxChange(
                                          'notificationPermission',
                                        )}
                                        value="notificationPermission"
                                        color="primary"
                                      />
                                    }
                                    label="Display notifications"
                                  />
                                )}
                              </FormGroup>
                            </FormControl>
                          </Fragment>
                        );
                      }}
                    </Mutation>
                  );
                }}
              </Query>
            }
          />
          {roles && roles.indexOf('easylogin') === -1 && <LinkEasyLogin />}
        </Grid>
      </Grid>
    </Fragment>
  );
};

Settings.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};
export default withSnackbar(Settings);
