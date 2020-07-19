import { postInterface } from "./post";

export interface userInterface {
  id: string;
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
  >;
  avatar: string;
}
