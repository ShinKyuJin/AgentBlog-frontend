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
        avatar
        bio
      }
      files {
        url
      }
      hashtags {
        name
      }
      createdAt
      commentCount
      content
      comments {
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
