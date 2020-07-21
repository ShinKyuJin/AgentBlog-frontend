import { postInterface } from "./post";

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
