import React, { useState } from "react";
import SearchPostList from "../containers/SearchPostList/SearchPostList";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import {
  searchPostData,
  searchPostVars,
  QUERY_SEARCH_POST,
} from "../containers/SearchPostList/SearchPostListQueries";

interface SearchParams {}

const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const searchTerm: string = location.search.split("=")[1];
  const [term, setTerm] = useState<string>(searchTerm);

  const { data, loading } = useQuery<searchPostData, searchPostVars>(
    QUERY_SEARCH_POST,
    {
      variables: { term },
    }
  );

  const onTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // window.history.replaceState(
    //   null,
    //   `"${e.target.value}" 검색 결과 - Agent Blog`,
    //   "/search?q=" + e.target.value
    // );
    history.replace("/search?q=" + e.target.value);
    setTerm(e.target.value);
  };

  return (
    <SearchPostList
      searchType={"Search"}
      posts={data?.searchPost}
      term={searchTerm}
      onTermChange={onTermChange}
      loading={loading}
    />
  );
};

export default Search;
