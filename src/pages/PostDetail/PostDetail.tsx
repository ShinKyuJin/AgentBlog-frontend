import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { getPostDetailVars, QUERY_POST_DETAIL, getPostDetailData } from "./PostDetailQueries";

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
  
  return (
    <Container>
      <TitleContainer>
        {data?.getPostDetail.title}
      </TitleContainer>
      <InfoContainer>

      </InfoContainer>
      <ContentContainer>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div``;
const TitleContainer = styled.div``;
const InfoContainer = styled.div``;
const ContentContainer = styled.div``;

export default PostDetail;
