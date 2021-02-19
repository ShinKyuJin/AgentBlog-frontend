import { postInterface } from "./post";
import { gql } from "@apollo/client";

export interface userInterface {
  id: string;
  avatar: string;
  username: string;
  blogname: string;
  email: string;
  bio: string;
  posts: Pick<
    postInterface,
    | "id"
    | "user"
    | "url"
    | "title"
    | "description"
    | "content"
    | "thumbnail"
    | "hashtags"
    | "createdAt"
    | "commentCount"
  >[];
}

export type MeProps = Pick<
  userInterface,
  "id" | "avatar" | "username" | "blogname" | "email" | "bio" | "posts"
>;

export type seeUser = Pick<
  userInterface,
  "id" | "avatar" | "username" | "blogname" | "email" | "bio" | "posts"
>;

export const QUERY_EDIT_USER = gql`
  mutation editUser(
    $username: String
    $blogname: String
    $bio: String
    $avatar: String
  ) {
    editUser(
      username: $username
      blogname: $blogname
      bio: $bio
      avatar: $avatar
    ) {
      username
      blogname
      email
      bio
      avatar
    }
  }
`;

export const QUERY_USER_HOME = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      avatar
      bio
      posts {
        id
        user {
          id
          username
          avatar
        }
        thumbnail
        description
        files {
          id
          url
        }
        url
        title
        content
        hashtags {
          id
          name
        }
        createdAt
        commentCount
      }
    }
  }
`;
