import gql from 'graphql-tag';

export const GET_SHORT_PROFILE = gql`
  query profile($author: String!) {
    profile(username: $author) {
      isCurator
      isBlacklisted
    }
  }
`;

export const GET_IS_FOLLOWED = gql`
  query profile($author: String!) {
    profile(username: $author) {
      isFollowed
    }
  }
`;
