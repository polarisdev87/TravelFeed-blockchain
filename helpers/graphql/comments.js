import gql from 'graphql-tag';

export const commentQuery = gql`
  query posts(
    $parent_id: Int
    $orderby: String
    $orderdir: String
    $offset: Int
  ) {
    posts(
      parent_id: $parent_id
      limit: 10
      orderby: $orderby
      orderdir: $orderdir
      offset: $offset
      is_comment: true
    ) {
      post_id
      author
      display_name
      body
      created_at
      children
      permlink
      depth
      votes
      total_votes
      parent_author
      parent_permlink
    }
  }
`;
