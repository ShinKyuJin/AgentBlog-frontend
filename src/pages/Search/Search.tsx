import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input";
import Theme from "../../styles/theme";
import { useQuery } from "react-apollo-hooks";
import Post, { PostLoadingSkeleton } from "../../components/Post";
import {
  QUERY_SEARCH_POST,
  searchPostData,
  searchPostVars,
} from "./SearchQueries";

const Search = () => {
  const [term, setTerm] = useState<string>("");
  const { loading, data } = useQuery<searchPostData, searchPostVars>(
    QUERY_SEARCH_POST,
    {
      variables: { term },
    }
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  return (
    <Wrapper>
      <SearchContainer>
        <SearchInput
          value={term}
          onChange={onChange}
          placeholder={"검색어를 입력하세요."}
        />
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
              file_url={post.files[0].url}
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
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 50vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 50vh;
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
