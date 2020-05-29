import { gql } from "apollo-boost";

export interface seeMain {
  files: {
    id: string;
    url: string;
  }[];
  title: string;
  content: string;
  createdAt: string;
  commentCount: string;
  user: {
    avatar: string;
    username: string;
  }
}

export interface seeMainData {
  posts: seeMain[];
}

export const QUERY_POSTS = gql`
{
  seeMain {
    id
 		user {
      avatar
      username
    }
    files(orderBy: id_ASC) {
      url
    }
    title
    content
    createdAt
  }
}
`