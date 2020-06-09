import { gql } from "apollo-boost";

export interface seeUser {
  avatar: string;
  bio: string;
  posts: {
    thumbnail: string;
    title: string;
    url: string;
    content: string;
    hashtags: {
      name: string;
    }
    createdAt: string;
    commentCount: number;
  }
}

export const QUERY_USER_HOME = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      avatar
      bio
      posts {
        thumbnail
        title
        url
        content
        createdAt
        commentCount
        hashtags {
          name
        }
      }
    }
  }
`;
