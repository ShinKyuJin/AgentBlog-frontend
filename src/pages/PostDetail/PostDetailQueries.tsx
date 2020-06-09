import { gql } from "apollo-boost";

export interface getPostDetail {
  title: string;
  user: {
    avatar: string;
    bio: string;
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
  comments: {
    text: string;
    user: {
      username: string;
      avatar: string;
    }
    createdAt: string;
  }[]
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
  }
}
`