import { gql } from "apollo-boost";
import { getPostDetail } from "../../interface/post";

export interface getPostDetailData {
  getPostDetail: getPostDetail;
}

export interface getPostDetailVars {
  username: string;
  url: string;
}

export const MUTATION_LIKE_POST = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const QUERY_POST_DETAIL = gql`
  query getPostDetail($username: String!, $url: String!) {
    getPostDetail(username: $username, url: $url) {
      id
      title
      user {
        id
        avatar
        bio
      }
      files {
        id
        url
      }
      hashtags {
        id
        name
      }
      createdAt
      commentCount
      content
      comments {
        id
        text
        user {
          username
          avatar
        }
        createdAt
      }
      isLiked
      likeCount
    }
  }
`;
