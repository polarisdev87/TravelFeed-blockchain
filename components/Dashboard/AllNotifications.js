import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { Query } from 'react-apollo';
import { GET_NOTIFICATIONS } from '../../helpers/graphql/notifications';
import { messageFromNotification } from '../../helpers/messageFromNotification';
import CustomSnackbar from './Notifications/CustomSnackbar';

const AllNotifications = props => {
  let { limit } = props;
  if (!limit) limit = 25;

  return (
    <>
      <Query query={GET_NOTIFICATIONS} variables={{ limit }}>
        {({ data, loading, error }) => {
          if (loading) {
            return (
              <div className="p-5 text-center">
                <CircularProgress />
              </div>
            );
          }
          if (error) {
            return (
              <Card className="m-5 text-center" key="noposts">
                <CardContent>
                  {error && 'Network Error. Are you online?'}
                </CardContent>
              </Card>
            );
          }
          if (data && data.notifications && data.notifications.length === 0) {
            return (
              <Card className="mt-5 m-2 text-center">
                <CardContent>
                  No notifications. Have you enabled notifications in the
                  settings?
                </CardContent>
              </Card>
            );
          }
          return (
            <>
              {data.notifications.map(message => {
                const msg = messageFromNotification(message);
                console.log(msg);
                return (
                  <div className="pt-3">
                    <CustomSnackbar variant="info" message={msg} />
                  </div>
                );
              })}
            </>
          );
        }}
      </Query>
    </>
  );
};

export default AllNotifications;
