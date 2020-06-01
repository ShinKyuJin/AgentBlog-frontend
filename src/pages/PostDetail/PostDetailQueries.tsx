import { gql } from "apollo-boost";

export interface getPostDetail {
  title: string;
  user: {
    avatar: string;
  }
  files: {
    url: string;
  }[]
  hashtags: {
    name: string;
  }[]
  content: string;
  createdAt: string;
  commentCount: number;
}

export interface getPostDetailData {
  getPostDetail: getPostDetail;
}

export interface getPostDetailVars {
  username: string;
  url: string;
}

export const QUERY_POST_DETAIL = gql`
query getPostDetail($username: String!, $url: String!) {
  getPostDetail(username: $username, url: $url) {
    title
    user {
      avatar
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
  }
}
`