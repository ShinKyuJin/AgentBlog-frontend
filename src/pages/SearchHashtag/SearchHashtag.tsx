import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import FatText from "../../components/FatText";
import Post, { PostLoadingSkeleton } from "../../components/Post";
import { useQuery } from "react-apollo-hooks";
import {
  searchHashtagData,
  searchHashtagVars,
  QUERY_SEARCH_HASHTAG,
} from "./SearchHashtagQueries";

export interface TagsParams {
  tagname: string;
}

const SearchHashtag = () => {
  const { tagname } = useParams() as TagsParams;
  const { loading, data } = useQuery<searchHashtagData, searchHashtagVars>(
    QUERY_SEARCH_HASHTAG,
    {
      variables: { name: tagname },
    }
  );

  return (
    <Wrapper>
      <SearchContainer>
        <ETagnameText text={`# ${tagname}`} />
        {!loading &&
          data &&
          data.searchHashtag &&
          (data.searchHashtag.length === 0 ? (
            <EText>검색 결과가 없습니다.</EText>
          ) : (
            <EText>
              총 <b>{data.searchHashtag.length}개</b>의 포스트를 찾았습니다.
            </EText>
          ))}

        {loading && (
          <>
            <PostLoadingSkeleton />
          </>
        )}

        {data &&
          data.searchHashtag &&
          data.searchHashtag.map((post) => (
            <Post
              key={post.id}
              username={post.user.username}
              avatar={post.user.avatar}
              url={post.url}
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

const ETagnameText = styled(FatText)`
  font-weight: 800;
  font-size: 48px;
  margin-bottom: 20px;
`;

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

export default SearchHashtag;
