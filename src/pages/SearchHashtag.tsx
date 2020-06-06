import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";

import SearchPostList from "../containers/SearchPostList/SearchPostList";
import {
  searchHashtagData,
  searchHashtagVars,
  QUERY_SEARCH_HASHTAG,
} from "../containers/SearchPostList/SearchPostListQueries";
import styled from "styled-components";

interface TagsParams {
  tagname: string;
}

const SearchHashtag = () => {
  const { tagname } = useParams() as TagsParams;

  const { data, loading } = useQuery<searchHashtagData, searchHashtagVars>(
    QUERY_SEARCH_HASHTAG,
    {
      variables: { name: tagname },
    }
  );

  return (
    <Container>
      <SearchPostList
        searchType={"Hashtag"}
        posts={
          !loading && data && data.searchHashtag
            ? data.searchHashtag.posts
            : null
        }
        tagname={tagname}
        loading={loading}
      />
    </Container>
  );
};

const Container = styled.div`
  @media (max-width: 1024px) {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 2rem;
  }
  margin-top: 3.5rem;

  width: 768px;
  margin-left: auto;
  margin-right: auto;
`;

export default SearchHashtag;
