import React, { FC } from "react";
import styled from "styled-components";
import Input from "../../components/Input";
import SearchPost, { PostLoadingSkeleton } from "../../components/SearchPost";
import FatText from "../../components/FatText";
import { SearchPostProps } from "../../interface/post";

interface SearchPostListProps {
  searchType: "Search" | "Hashtag";
  posts?: SearchPostProps[] | null;
  loading: boolean;
  tagname?: string;
  term?: string;
  onTermChange?:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
}

const SearchPostList: FC<SearchPostListProps> = ({
  searchType,
  posts,
  loading,
  term,
  onTermChange,
  tagname,
}) => {
  return (
    <Wrapper>
      <SearchContainer>
        {searchType === "Hashtag" && <ETagnameText text={`# ${tagname}`} />}
        {searchType === "Search" && (
          <SearchInputContainer>
            <SearchInput
              value={term}
              onChange={onTermChange}
              placeholder={"검색어를 입력하세요."}
            />
          </SearchInputContainer>
        )}

        {!loading &&
          posts &&
          (posts.length === 0 ? (
            <EText>검색 결과가 없습니다.</EText>
          ) : (
            <EText>
              총 <b>{posts.length}개</b>의 포스트를 찾았습니다.
            </EText>
          ))}

        {loading && (searchType !== "Search" || (term && term.length > 0)) && (
          <>
            <PostLoadingSkeleton />
            <PostLoadingSkeleton />
          </>
        )}

        {posts && posts.map((post) => <SearchPost key={post.id} {...post} />)}
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
  border-color: ${(props) => props.theme.darkGreyColor};
  background: white;
  font-size: 25px;
  height: 60px;
  width: 100%;
  margin-bottom: 15px;
`;

const ETagnameText = styled(FatText)`
  font-weight: 800;
  font-size: 48px;
  margin-bottom: 20px;
`;

export default SearchPostList;
