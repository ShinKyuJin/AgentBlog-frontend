import React, { useState } from "react";
import SearchPostList from "../containers/SearchPostList/SearchPostList";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import {
  searchPostData,
  searchPostVars,
  QUERY_SEARCH_POST,
} from "../containers/SearchPostList/SearchPostListQueries";
import { Helmet } from "react-helmet";
import styled from "styled-components";

const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const searchTerm: string = location.search.split("=")[1];
  const [term, setTerm] = useState<string>(searchTerm ? searchTerm : "");

  const { data, loading } = useQuery<searchPostData, searchPostVars>(
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
