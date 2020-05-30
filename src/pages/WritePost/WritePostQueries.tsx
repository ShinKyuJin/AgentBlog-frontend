import { gql } from "apollo-boost";

export interface writePost {
  title: string;
  hashtags: [string];
  content: string;
  series_title: string;
  files: [string];
  url: string;
}

export const QUERY_WRITE_POST = gql`
  mutation posting($title: String!, $hashtags: [String!], $content: String!, $series_title: String,$url: String!, $files: [String!]) {
    posting(title:$title, hashtags:$hashtags, content:$content, series_title:$series_title, url:$url, files:$files) {
      user {
        username
      }
      url
    }
  }
`;