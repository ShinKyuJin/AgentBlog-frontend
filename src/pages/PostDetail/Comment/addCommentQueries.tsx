import { gql } from 'apollo-boost';

export interface addComment {
  text: string;
  postId: string;
}

export interface addCommentVar {
  addComment: addComment;
}

export interface addCommentData {
  user: {
    avatar: string;
    username: string;
  }
  text: string;
}

export const ADD_COMMENT = gql`
mutation addComment(
  $text: String!,
  $postId: String!
) {
  addComment(text: $text, postId: $postId) {
    user {
      avatar
      username
    }
    text
  }
}
`