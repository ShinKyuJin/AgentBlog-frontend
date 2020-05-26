import React, { useState } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import Theme from "../styles/Theme";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Post from "../components/Post";

interface searchPost {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  files: {
    id: string;
    url: string;
  }[];
  title: string;
  content: string;
  hashtags: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  commentCount: number;
}

interface searchPostData {
  searchPost: searchPost[];
}

interface searchPostVars {
  term: string;
}

const QUERY_SEARCH_POST = gql`
  query searchPost($term: String!) {
    searchPost(term: $term) {
      id
      user {
        id
        username
        avatar
      }
      files {
        id
        url
      }
      title
      content
      hashtags {
        id
        name
      }
      createdAt
      commentCount
    }
  }
`;

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

        {data &&
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
