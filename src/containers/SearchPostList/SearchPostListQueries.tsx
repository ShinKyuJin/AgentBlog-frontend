import { gql } from "apollo-boost";

export interface postInterface {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  files: {
    id: string;
    url: string;
  }[];
  url: string;
  title: string;
  content: string;
  hashtags: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  commentCount: number;
}

export interface searchPostData {
  searchPost: postInterface[];
}

export interface searchPostVars {
  term: string;
}

export const QUERY_SEARCH_POST = gql`
  query searchPost($term: String!) {
    searchPost(term: $term) {
      id
      user {
        id
        username
        avatar
      }
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
`;

export interface searchHashtag {
  id: string;
  explanation: string;
  posts: [postInterface];
}

export interface searchHashtagData {
  searchHashtag: searchHashtag;
}

export interface searchHashtagVars {
  name: string;
}

export const QUERY_SEARCH_HASHTAG = gql`
  query searchHashtag($name: String!) {
    searchHashtag(name: $name) {
      id
      explanation
      posts {
        id
        user {
          id
          username
          avatar
        }
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
