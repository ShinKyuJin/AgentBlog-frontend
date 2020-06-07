import React, { FC } from "react";
import styled from "styled-components";
import Input from "../../components/Input";
import SearchPostCard, {
  PostLoadingSkeleton,
} from "../../components/SearchPostCard";
import { SearchPostProps } from "../../interface/post";
import Theme from "../../styles/theme";

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
        {searchType === "Hashtag" && (
          <ETagnameText>{`# ${tagname}`}</ETagnameText>
        )}
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
              총{" "}
              <b style={{ color: Theme.deepDarkGreyColor }}>{posts.length}개</b>
              의 포스트를 찾았습니다.
            </EText>
          ))}

        {loading && (searchType !== "Search" || (term && term.length > 0)) && (
          <>
            <PostLoadingSkeleton />
            <PostLoadingSkeleton />
          </>
        )}

        {posts &&
          posts.map((post) => <SearchPostCard key={post.id} {...post} />)}
      </SearchContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 780px;
  margin: auto;
  min-height: 50vh;
`;

const EText = styled.span`
  display: block;
  font-weight: 400;
  width: 100%;
  color: ${(prop) => prop.theme.greyColor};
  line-height: 1.5;
  font-size: 1.125rem;
  margin-bottom: 4rem;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 50vh;
`;

const SearchInputContainer = styled.div`
  margin-bottom: 1.5rem;
`;
const SearchInput = styled(Input)`
  @media (max-width: 768px) {
    height: 2.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  display: block;
  border-radius: 1px;
  border-color: ${(props) => props.theme.darkGreyColor};
  background: white;
  font-size: 25px;
  height: 4rem;
  width: 100%;
  padding: 0px 1.5rem;

  transition: border-color 0.08s ease-out 0s;
  &:focus {
    border-color: ${(prop) => prop.theme.deepDarkGreyColor};
  }
`;

const ETagnameText = styled.h2`
  font-weight: 700;
  font-size: 3rem;
  line-height: 1.5;
  margin-bottom: 20px;
`;

export default SearchPostList;
