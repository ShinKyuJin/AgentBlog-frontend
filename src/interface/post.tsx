export interface postInterface {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  title: string;
  url: string;
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
    user: {
      id: string;
      username: string;
      createdAt: string;
      updatedAt: string;
    };
  };
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
  | "content"
  | "thumbnail"
  | "hashtags"
  | "createdAt"
  | "commentCount"
>;
