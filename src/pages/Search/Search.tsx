import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input";
import Theme from "../../styles/Theme";
import { useQuery } from "react-apollo-hooks";
import Post, { PostLoadingSkeleton } from "../../components/Post";
import {
  QUERY_SEARCH_POST,
  searchPostData,
  searchPostVars,
} from "./SearchQueries";
import { useLocation, useHistory } from "react-router-dom";

interface SearchParams {}

const Search = () => {
  const location = useLocation();
  let history = useHistory();
  const searchTerm: string = location.search.split("=")[1];

  const [term, setTerm] = useState<string>(searchTerm);
  const { loading, data } = useQuery<searchPostData, searchPostVars>(
    QUERY_SEARCH_POST,
    {
      variables: { term },
    }
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    history.replace("/search?q=" + e.target.value);
    setTerm(e.target.value);
  };

  return (
    <Wrapper>
      <SearchContainer>
        <SearchInputContainer>
          <SearchInput
            value={term}
            onChange={onChange}
            placeholder={"검색어를 입력하세요."}
          />
        </SearchInputContainer>
        {term &&
          !loading &&
          data &&
          data.searchPost &&
          (data.searchPost.length === 0 ? (
            <EText>검색 결과가 없습니다.</EText>
          ) : (
            <EText>
              총 <b>{data.searchPost.length}개</b>의 포스트를 찾았습니다.
            </EText>
          ))}

        {loading && (
          <>
            <PostLoadingSkeleton />
            <PostLoadingSkeleton />
          </>
        )}

        {data &&
          data.searchPost &&
          data.searchPost.map((post) => (
            <Post
              key={post.id}
              username={post.user.username}
              avatar={post.user.avatar}
              url={post.url}
              file_url={post.files.length > 0 ? post.files[0].url : null}
              title={post.title}
              content={post.content}
              hashtags={post.hashtags.map((hashtag) => hashtag.name)}
              createdAt={post.createdAt}
              commentCount={post.commentCount}
            />
          ))}
      </SearchContainer>
    </Wrapper>
  );
};

const EText = styled.span`
  display: block;
  font-weight: 400;
  width: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 50vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 780px;
  margin: auto;
  min-height: 50vh;
`;

const SearchInputContainer = styled.div`
  padding: 10px 40px 10px 10px;
`;
const SearchInput = styled(Input)`
  display: block;
  border-radius: 1px;
  border-color: ${Theme.darkGreyColor};
  background: white;
  font-size: 25px;
  height: 60px;
  width: 100%;
  margin-bottom: 15px;
`;

export default Search;
