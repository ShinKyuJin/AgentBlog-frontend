import { gql } from "@apollo/client";

export const QUERY_POP_TAGS = gql`
  {
    getPopularHashtag {
      name
    }
  }
`;
