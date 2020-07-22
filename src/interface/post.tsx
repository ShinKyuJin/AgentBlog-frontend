import { userInterface } from "./user";

export interface postInterface {
  id: string;
  user: Pick<userInterface, "id" | "username" | "avatar" | "bio">;
  title: string;
  url: string;
  description: string;
  content: string;
  hashtags: {
    id: string;
    name: string;
  }[];
  series: {
    id: string;
    title: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
  files: {
    id: string;
    url: string;
  }[];
  thumbnail: string;
  likes: {
    id: string;
    user: {
      id: string;
      username: string;
    };
    createdAt: string;
  };
  comments: {
    id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    user: Pick<userInterface, "id" | "avatar" | "username">;
  }[];
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  commentCount: number;
}

export type HomePostProps = Pick<
  postInterface,
  | "id"
  | "user"
  | "files"
  | "url"
  | "title"
  | "description"
  | "content"
  | "thumbnail"
  | "likeCount"
  | "createdAt"
  | "commentCount"
>;

export type SearchPostProps = Pick<
  postInterface,
  | "id"
  | "user"
  | "files"
  | "url"
  | "title"
  | "description"
  | "content"
  | "thumbnail"
  | "hashtags"
  | "createdAt"
  | "commentCount"
>;

export type getPostDetail = Pick<
  postInterface,
  | "id"
  | "title"
  | "user"
  | "files"
  | "content"
  | "hashtags"
  | "createdAt"
  | "comments"
  | "commentCount"
  | "isLiked"
  | "likeCount"
>;
