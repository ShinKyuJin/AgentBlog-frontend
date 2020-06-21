import { gql } from "apollo-boost";
import { SearchPostProps } from "../../interface/post";

export interface searchPostData {
  searchPost: SearchPostProps[];
}

export interface searchPostVars {
  term: string;
}

export interface searchHashtag {
  id: string;
  explanation: string;
  posts: [SearchPostProps];
}

export interface searchHashtagData {
  searchHashtag: searchHashtag;
}

export interface searchHashtagVars {
  name: string;
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
      thumbnail
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
        thumbnail
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
