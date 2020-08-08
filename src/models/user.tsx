import { postInterface } from "./post";
import { gql } from "apollo-boost";

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
    | "url"
    | "title"
    | "description"
    | "thumbnail"
    | "likeCount"
    | "createdAt"
    | "commentCount"
  >[];
}

export type MeProps = Pick<
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
