import { userInterface } from "./user";
import { gql } from "@apollo/client";

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
  | "url"
  | "content"
  | "hashtags"
  | "thumbnail"
  | "createdAt"
  | "series"
  | "comments"
  | "commentCount"
  | "isLiked"
  | "likeCount"
>;

export const QUERY_WRITE_POST = gql`
  mutation posting(
    $title: String!
    $hashtags: [String!]
    $content: String!
    $series_id: String
    $thumbnail: String
    $url: String!
  ) {
    posting(
      title: $title
      hashtags: $hashtags
      content: $content
      series_id: $series_id
      thumbnail: $thumbnail
      url: $url
    ) {
      url
      user {
        username
      }
    }
  }
`;

export const QUERY_POST_DETAIL = gql`
  query getPostDetail($username: String!, $url: String!) {
    getPostDetail(username: $username, url: $url) {
      id
      title
      url
      user {
        id
        bio
        avatar
      }
      files {
        id
        url
      }
      hashtags {
        id
        name
      }
      series {
        id
        title
      }
      thumbnail
      createdAt
      commentCount
      content
      comments {
        id
        text
        user {
          username
          avatar
        }
        createdAt
      }
      isLiked
      likeCount
    }
  }
`;

export const QUERY_EDIT_POST = gql`
  mutation editPost(
    $id: String!
    $title: String!
    $url: String!
    $hashtags: [String!]!
    $thumbnail: String
    $content: String!
    $description: String
    $series_id: String
    $action: ACTIONS!
  ) {
    editPost(
      id: $id
      title: $title
      url: $url
      hashtags: $hashtags
      thumbnail: $thumbnail
      content: $content
      description: $description
      series_id: $series_id
      action: $action
    ) {
      url
    }
  }
`;
