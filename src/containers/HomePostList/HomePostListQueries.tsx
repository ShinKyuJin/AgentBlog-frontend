import { gql } from "apollo-boost";
import { HomePostProps } from "../../interface/post";

export interface seeLatestPostData {
  seeLatestPost: HomePostProps[];
}

export interface seeTrendyPostData {
  seeTrendyPost: HomePostProps[];
}

export const QUERY_LATEST_POST = gql`
  {
    seeLatestPost {
      id
      user {
        avatar
        username
      }
      files {
        url
      }
      url
      title
      description
      content
      thumbnail
      likeCount
      createdAt
      commentCount
    }
  }
`;

export const QUERY_TRENDY_POST = gql`
  {
    seeTrendyPost {
      id
      user {
        avatar
        username
      }
      files {
        url
      }
      url
      title
      description
      content
      thumbnail
      likeCount
      createdAt
      commentCount
    }
  }
`;
