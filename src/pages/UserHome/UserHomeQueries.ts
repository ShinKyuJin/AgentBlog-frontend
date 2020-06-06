import { gql } from "apollo-boost";

export const QUERY_USER_HOME = gql`
query seeUser($username: String!) {
  seeUser(username: $username) {
    avatar
    bio
    posts {
      title
      hashtags
      createdAt
      commentCount
      thumbnail
    }
  }
}
`