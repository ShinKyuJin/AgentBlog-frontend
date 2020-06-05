import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";

import SearchPostList from "../containers/SearchPostList/SearchPostList";
import {
  searchHashtagData,
  searchHashtagVars,
  QUERY_SEARCH_HASHTAG,
} from "../containers/SearchPostList/SearchPostListQueries";

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
    <SearchPostList
      searchType={"Hashtag"}
      posts={
        !loading && data && data.searchHashtag ? data.searchHashtag.posts : null
      }
      tagname={tagname}
      loading={loading}
    />
  );
};

export default SearchHashtag;
