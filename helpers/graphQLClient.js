import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql/language/printer';
import Cookie from 'js-cookie';
import { GRAPHQL_URL } from '../config';

const authorization = Cookie.get('access_token');

const graphQLClient = new GraphQLClient(GRAPHQL_URL, {
  headers: {
    authorization,
  },
});

const request = (query, variables) => {
  return graphQLClient.request(print(query), variables);
};

export default request;
