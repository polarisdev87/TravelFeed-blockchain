import gql from 'graphql-tag';

export const ADD_BOOKMARK = gql`
  mutation addBookmark($author: String!, $permlink: String!) {
    addBookmark(author: $author, permlink: $permlink) {
      success
      message
    }
  }
`;

export const DELETE_BOOKMARK = gql`
  mutation deleteBookmark($author: String!, $permlink: String!) {
    deleteBookmark(author: $author, permlink: $permlink) {
      success
      message
    }
  }
`;

export const IS_BOOKMARKED = gql`
  query isBookmarked($author: String!, $permlink: String!) {
    isBookmarked(author: $author, permlink: $permlink)
  }
`;

export const GET_BOOKMARKS = gql`
  query bookmarks($offset: Int, $limit: Int) {
    bookmarks(offset: $offset, limit: $limit) {
      author
      display_name
      permlink
      title
      img_url
      created_at
      body
      votes
      tags
      total_votes
      curation_score
      app
      parent_author
      parent_permlink
      root_title
      depth
      children
    }
  }
`;
