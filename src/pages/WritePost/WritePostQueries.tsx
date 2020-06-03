import { gql } from "apollo-boost";


export const QUERY_WRITE_POST = gql`
  mutation posting(
    $title: String!,
    $hashtags: [String!],
    $content: String!,
    $series_id: String,
    $thumbnail: String,
    $url: String!,
    $files: [String!]
  ) {
    posting(
    title: $title,
    hashtags: $hashtags,
    content: $content,
    series_id: $series_id,
    thumbnail: $thumbnail,
    url: $url,
    files: $files
  ) {
    url
    user {
      username
    }
  }
}
`;