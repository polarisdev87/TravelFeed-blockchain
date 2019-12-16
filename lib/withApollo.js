/* eslint-disable no-console */
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import Cookie from 'js-cookie';
import withApollo from 'next-with-apollo';
import { GRAPHQL_URL } from '../config';

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: GRAPHQL_URL,
      cache: new InMemoryCache().restore(initialState || {}),
      onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors);
        console.log('networkError', networkError);
      },
      fetchOptions: {
        credentials: 'include',
      },
      request: operation => {
        const token = Cookie.get('access_token');
        operation.setContext({
          headers: {
            authorization: token,
          },
        });
      },
    }),
);
