import { gql } from "apollo-boost";

export interface seeMain {
  files: {
    id: string;
    url: string | null;
  }[];
  title: string;
  content: string;
  createdAt: string;
  commentCount: string;
  user: {
    avatar: string;
    username: string;
  };
}

export interface seeMainData {
  seeMain: seeMain[];
}

export const QUERY_POSTS = gql`
  {
    seeMain {
      id
      user {
        avatar
        username
      }
      files {
        url
      }
      title
      content
      createdAt
    }
  }
`;
