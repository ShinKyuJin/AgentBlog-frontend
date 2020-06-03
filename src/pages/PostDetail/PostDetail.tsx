import React from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { getPostDetailVars, QUERY_POST_DETAIL, getPostDetailData } from "./PostDetailQueries";
import Markdown from "../../components/Markdown";
import Avatar from "../../components/Avatar";

interface PostDetailParams {
  username: string;
  posturl: string;
}

let key = 0;
const PostDetail = () => {
  const { username, posturl } = useParams() as PostDetailParams;
  const { loading, data } = useQuery<getPostDetailData, getPostDetailVars>(QUERY_POST_DETAIL, {
    variables: {
      username: username,
      url: posturl
    }
  });

  const content = data?.getPostDetail.content as string;
  const avatar = data?.getPostDetail.user.avatar as string;
  

  const mappingHashtag = data?.getPostDetail.hashtags.map(({ name }) => (
    <Hashtag to={`/${name}`} key={key++}>
      {name}
    </Hashtag>
  ))

  return (
    <Container>
      <HeaderContainer>
        <TitleContainer>
          {data?.getPostDetail.title}
        </TitleContainer>
        <InfoContainer>
          <ToUserInfo to={`/@${username}`}>{username}</ToUserInfo> · {data?.getPostDetail.createdAt.slice(0, 10)}
        </InfoContainer>
        <HashtagContainer>
          {mappingHashtag}
        </HashtagContainer>
      </HeaderContainer>
      <BodyContainer>
        <Markdown source={content} />
      </BodyContainer>
      <TailContainer>
        <Link to={`/@${username}`}>
          <TailAvatar url={avatar} size="lg" />
        </Link>
        <TailUserInfo>
          <TailLink to={`/@${username}`}>{username}</TailLink>
          {data?.getPostDetail.user.bio}
        </TailUserInfo>
      </TailContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
  margin: 0 auto;
  background-color: white;
  margin-top: 5rem;
`
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
`
const TitleContainer = styled.div`
  font-weight: 700;
  font-size: 60px;
`
const InfoContainer = styled.div` 
  font-size: 18px;
`  // username, createdAt
const ToUserInfo = styled(Link)`
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`
const HashtagContainer = styled.div``
const Hashtag = styled(Link)`
  color: rgb(12, 166, 120);
  background-color: rgb(241, 243, 245);
  padding: 0 1rem;
`

const BodyContainer = styled.div``
const TailContainer = styled.div`
  display: flex;
  align-items: center;
`
const TailAvatar = styled(Avatar)``
const TailLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: black;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`
const TailUserInfo = styled.div`
  margin-left: 1rem;
  font-size: 1.5rem;
`


export default PostDetail;