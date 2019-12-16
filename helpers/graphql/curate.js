import gql from 'graphql-tag';

export const CURATE = gql`
  mutation curatePost($author: String!, $permlink: String!, $type: String!) {
    curatePost(author: $author, permlink: $permlink, type: $type) {
      success
      message
    }
  }
`;
