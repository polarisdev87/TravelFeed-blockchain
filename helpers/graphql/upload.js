import gql from 'graphql-tag';

export const IMAGE_UPLOAD_LINK = gql`
  query imageUploadLink($filename: String!, $size: Int!, $infoToken: String) {
    imageUploadLink(filename: $filename, size: $size, infoToken: $infoToken) {
      success
      uploadUrl
      fileName
    }
  }
`;
