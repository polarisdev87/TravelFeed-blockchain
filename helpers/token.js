import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import api from './steemConnectAPI';

export const setAccessToken = (token, expiresIn) => {
  // If cookies are not accepted, set only session cookie (allowed by gdpr)
  const expiry =
    Cookie.get('cookie_consent') !== 'true'
      ? ''
      : new Date(new Date().getTime() + expiresIn * 1000);
  Cookie.set('access_token', token, { expires: expiry });
};
export const setScToken = (token, expiresIn) => {
  const expiry =
    Cookie.get('cookie_consent') !== 'true'
      ? ''
      : new Date(new Date().getTime() + expiresIn * 1000);
  Cookie.set('sc_token', token, { expires: expiry });
};
export const getRoles = () => {
  const token = Cookie.get('access_token');
  if (token === undefined) {
    return undefined;
  }
  const jwt = jwtDecode(token);
  return jwt.roles ? jwt.roles : [];
};
export const getUser = () => {
  const token = Cookie.get('access_token');
  if (token === undefined) {
    return undefined;
  }
  const jwt = jwtDecode(token);
  return jwt.name;
};
// Submit custom_json for steemapps.com tracking once a day - better to let
// users do this manually
// export const getUserActive = () => {
//   const token = Cookie.get("access_token");
//   if (token === undefined) {
//     return undefined;
//   }
//   const jwt = jwtDecode(token);
//   // Submit custom_json for steemapps.com tracking once a day
//   const active = Cookie.get("last_active_broadcast");
//   if (active === undefined || active !== jwt.name) {
//     broadcastActiveUser();
//     const expiry =
//       Cookie.get("cookie_consent") !== "true"
//         ? ""
//         : new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
//     Cookie.set("last_active_broadcast", jwt.name, {
//       expires: expiry
//     });
//   }
//   return jwt.name;
// };
export const getScToken = () => Cookie.get('sc_token');
export const getAccessToken = () => {
  const token = Cookie.get('access_token');
  const decoded = jwtDecode(token);
  const expires = new Date(decoded.exp * 1000);
  return { token, expires };
};
export const logout = () => {
  Cookie.remove('access_token');
  Cookie.remove('sc_token');
  api.revokeToken();
};
export const hasSteemFestCookie = () => {
  return Cookie.get('steemfest') === 'true';
};
export const removeSteemfestCookie = () => {
  Cookie.remove('steemfest');
};
export const hasCookieConsent = () => {
  return Cookie.get('cookie_consent');
};
export const setCookieConsent = consent => {
  // Set cookie with one year expiration
  const expires = new Date(new Date().getTime() + 3600 * 1000 * 24 * 365);
  Cookie.set('cookie_consent', consent, { expires });
};
export const isHideNewUserMessage = () => {
  return Cookie.get('hide_new_user_message') === 'true';
};
export const setHideNewUserMessage = () => {
  // Set cookie with one week expiration
  const expires = new Date(new Date().getTime() + 3600 * 1000 * 24 * 7);
  Cookie.set('hide_new_user_message', true, { expires });
};
export const deleteCookieConsent = () => {
  Cookie.remove('cookie_consent');
};
export const getInfoToken = () => Cookie.get('info_token');
export const setInfoToken = token => Cookie.set('info_token', token);

export const getLoginURL = api.getLoginURL();
