import gql from 'graphql-tag';

export const SAVE_DRAFT = gql`
  mutation addDraft(
    $id: String!
    $title: String
    $body: String
    $json: String
    $isCodeEditor: Boolean
    $publishedDate: Date
    $scheduledDate: Date
  ) {
    addDraft(
      id: $id
      title: $title
      body: $body
      json: $json
      isCodeEditor: $isCodeEditor
      publishedDate: $publishedDate
      scheduledDate: $scheduledDate
    ) {
      success
      message
    }
  }
`;

export const DELETE_DRAFT = gql`
  mutation deleteDraft($id: String!) {
    deleteDraft(id: $id) {
      success
      message
    }
  }
`;

export const GET_DRAFTS = gql`
  query drafts(
    $offset: Int
    $limit: Int
    $isScheduled: Boolean
    $isPublished: Boolean
  ) {
    drafts(
      offset: $offset
      limit: $limit
      isScheduled: $isScheduled
      isPublished: $isPublished
    ) {
      id
      savedate
      title
      body
      json
      isCodeEditor
      scheduledDate
      publishedDate
      isScheduleFailed
    }
  }
`;

export const GET_DRAFT_BY_ID = gql`
  query draft($id: String!) {
    draft(id: $id) {
      title
      body
      json
      isCodeEditor
    }
  }
`;
