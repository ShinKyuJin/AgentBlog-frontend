import { gql } from "apollo-boost";
import { getPostDetail } from "../../../models/post";

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
