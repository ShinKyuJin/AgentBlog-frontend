import { gql } from "apollo-boost";

export const QUERY_POP_TAGS = gql`
  {
    getPopularHashtag {
      name
    }
  }
`;
