import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";

import SearchPostList from "../modules/SearchPostList/SearchPostList";
import {
  searchHashtagData,
  searchHashtagVars,
  QUERY_SEARCH_HASHTAG,
} from "../modules/SearchPostList/SearchPostListQueries";
import styled from "styled-components";
import { toast } from "react-toastify";

interface TagsParams {
  tagname: string;
}

const SearchHashtag = () => {
  const { tagname } = useParams() as TagsParams;

  const { data, loading, error } = useQuery<
    searchHashtagData,
    searchHashtagVars
  >(QUERY_SEARCH_HASHTAG, {
    variables: { name: tagname },
  });
  useEffect(() => {
    if (error) {
      window.location.reload();
      toast.error("포스트를 가져오던 중 문제가 발생했습니다.");
    }
  }, [error]);

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
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;
  width: 702px;
`;

export default SearchHashtag;
