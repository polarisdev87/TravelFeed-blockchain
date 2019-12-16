import gql from 'graphql-tag';

export const SAVE_NEWSLETTER = gql`
  mutation saveNewsletter(
    $title: String!
    $intro: String!
    $updates: String
    $posts: String
  ) {
    saveNewsletter(
      title: $title
      intro: $intro
      updates: $updates
      posts: $posts
    ) {
      success
      message
    }
  }
`;

export const SEND_NEWSLETTER = gql`
  mutation sendNewsletter(
    $title: String!
    $intro: String!
    $updates: String
    $posts: String
    $isTest: Boolean
  ) {
    sendNewsletter(
      title: $title
      intro: $intro
      updates: $updates
      posts: $posts
      isTest: $isTest
    ) {
      success
      message
    }
  }
`;

export const GET_NEWSLETTER_DRAFT = gql`
  query userstats {
    newsletterDraft {
      title
      intro
      updates {
        text
        title
        image
        button
        link
      }
      posts {
        title
        permlink
        excerpt
        author
      }
    }
  }
`;
