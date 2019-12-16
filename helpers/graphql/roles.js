import gql from 'graphql-tag';

export const CHANGE_CURATOR_ROLE = gql`
  mutation updateUserRoles($user: String!, $isCurator: Boolean!) {
    updateUserRoles(user: $user, isCurator: $isCurator) {
      success
      message
    }
  }
`;
