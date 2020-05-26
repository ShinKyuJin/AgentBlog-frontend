import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import Input from "../components/Input";
import Theme from "../styles/Theme";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { toast } from "react-toastify";

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
  const { loading, data } = useQuery(QUERY_SEARCH_POST, {
    variables: { term },
  });

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
