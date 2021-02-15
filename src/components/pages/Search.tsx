import React, { useState, useEffect } from "react";
import SearchPostList from "../modules/SearchPostList/SearchPostList";
import { useHistory, useLocation } from "react-router-dom";
import {
  searchPostData,
  searchPostVars,
  QUERY_SEARCH_POST,
} from "../modules/SearchPostList/SearchPostListQueries";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client";

const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const searchTerm: string = location.search.split("=")[1];
  const [term, setTerm] = useState<string>(searchTerm ? searchTerm : "");

  const { data, loading, error } = useQuery<searchPostData, searchPostVars>(
    QUERY_SEARCH_POST,
    {
      variables: { term },
      skip: term.length === 0,
    }
  );

  const onTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    history.replace("/search?q=" + e.target.value);
    setTerm(e.target.value);
  };

  useEffect(() => {
    if (error) {
      window.location.reload();
      toast.error("포스트를 가져오던 중 문제가 발생했습니다.");
    }
  }, [error]);

  return (
    <Container>
      <Helmet>
        <title>
          {term.length > 0 ? `"${term}" 검색 결과 - Agent Blog` : "Agent Blog"}
        </title>
      </Helmet>
      <SearchPostList
        searchType={"Search"}
        posts={data?.searchPost}
        term={term}
        onTermChange={onTermChange}
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
    margin-top: 0.5rem;
    width: 100%;
  }

  margin-top: 3.5rem;
  width: 768px;
  margin-left: auto;
  margin-right: auto;
`;

export default Search;
