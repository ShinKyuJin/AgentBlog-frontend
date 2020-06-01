import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { getPostDetailVars, QUERY_POST_DETAIL, getPostDetailData } from "./PostDetailQueries";
import Markdown from "../../components/Markdown";

interface PostDetailParams {
  username: string;
  posturl: string;
}


const PostDetail = () => {
  const { username, posturl } = useParams() as PostDetailParams;
  const { data } = useQuery<getPostDetailData, getPostDetailVars>(QUERY_POST_DETAIL, {
    variables: {
      username: username,
      url: posturl
    }
  });
  console.log(data);
  console.log(username);
  console.log(posturl);
  
  return (
    <Container>
      <TitleContainer>
        {data?.getPostDetail.title}
      </TitleContainer>
      <InfoContainer>
        {username}·{data?.getPostDetail.createdAt}
      </InfoContainer>
      <ContentContainer>
        <Markdown source={`${data?.getPostDetail.content}`} />
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div``;
const TitleContainer = styled.div``;
const InfoContainer = styled.div``;
const ContentContainer = styled.div``;

export default PostDetail;
