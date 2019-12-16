import Cookie from 'js-cookie';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import ErrorPage from '../components/General/ErrorPage';
import Header from '../components/Header/Header';
import LoginDialog from '../components/Login/LoginDialog';
import { ACCEPT_TOS, GET_LOGIN_TOKEN } from '../helpers/graphql/token';
import { setAccessToken, setScToken } from '../helpers/token';

const LoginPage = props => {
  const [loaded, setLoaded] = useState(false);
  const [referrer, setReferrer] = useState(undefined);

  useEffect(() => {
    setLoaded(true);
    setReferrer(Cookie.get('referrer'));
  });

  const { sc_token, expires_in } = props.sc;
  return (
    <>
      <Header />
      <>
        <Query
          query={GET_LOGIN_TOKEN}
          variables={{
            sc_token,
          }}
        >
          {({ data, loading }) => {
            if (loading || !loaded) {
              return (
                <>
                  <Header />
                </>
              );
            }
            if (data) {
              // If tos are not accepted, display tos dialogue
              if (data && data.login && data.login.hasAcceptedTos === false) {
                return (
                  <Mutation
                    mutation={ACCEPT_TOS}
                    variables={{
                      sc_token,
                      acceptTos: true,
                      referrer,
                    }}
                  >
                    {// eslint-disable-next-line no-shadow
                    (acceptTos, data) => {
                      // If successful
                      if (data && data.data && data.data.login.hasAcceptedTos) {
                        if (data.data.login.jwt)
                          setAccessToken(data.data.login.jwt, expires_in);
                        else return <ErrorPage statusCode="invalid_login" />;
                        if (sc_token) setScToken(sc_token, expires_in);
                        // Force hard reload on login to update apollo context with new access token
                        window.open('/dashboard', '_self', undefined, true);
                        return <></>;
                      }
                      return <LoginDialog acceptTos={acceptTos} />;
                    }}
                  </Mutation>
                );
              }
              if (sc_token) setScToken(sc_token, expires_in);
              if (data.login.jwt) {
                setAccessToken(data.login.jwt, expires_in);
                window.open('/dashboard', '_self', undefined, true);
              } else return <ErrorPage statusCode="invalid_login" />;
              return '';
            }
            return (
              <>
                <ErrorPage statusCode="invalid_login" />
              </>
            );
          }}
        </Query>
      </>
    </>
  );
};

LoginPage.getInitialProps = props => {
  const sc_token = props.query.access_token;
  const { expires_in } = props.query;
  return {
    sc: {
      sc_token,
      expires_in,
    },
  };
};

LoginPage.propTypes = {
  sc: PropTypes.objectOf(PropTypes.string),
};

export default LoginPage;
