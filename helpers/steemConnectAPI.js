import steemconnect from 'steemconnect';
import { STEEMCONNECT_CALLBACK_URL } from '../config';

const api = new steemconnect.Client({
  app: 'travelfeed.app',
  callbackURL: STEEMCONNECT_CALLBACK_URL,
  accessToken: 'access_token',
  scope: [
    'vote',
    'comment',
    'comment_options',
    'custom_json',
    'account_update2',
  ],
});

export default api;
