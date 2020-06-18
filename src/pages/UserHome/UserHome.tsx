import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { seeUser, QUERY_USER_HOME } from "./UserHomeQueries";
import { useQuery } from "react-apollo-hooks";
import Avatar from "../../components/Avatar";

interface UserHomeParams {
  username: string;
}

interface seeUserData {
  seeUser: seeUser;
}

interface seeUserVar {
  username: string;
}

interface TabProps {
  tabNum: number;
}

const UserHome = () => {
  const { username } = useParams() as UserHomeParams;
  const [tabNum, setTabNum] = useState<TabProps>();
  const { data } = useQuery<seeUserData,seeUserVar>(QUERY_USER_HOME, {
    variables: {
      username
    }
  });

  const avatar = data?.seeUser.avatar as string;

  return (
    <Container>
      <Helmet>
        <title>Agents Blog!</title>
      </Helmet>
      <UserContainer>
        <AvatarContainer>
          <Avatar url={avatar} size="lg" />
        </AvatarContainer>
        <UserInfoContainer>
          <UserNameContainer>{username}</UserNameContainer>
          <UserBioContainer>{data?.seeUser.bio}</UserBioContainer>
        </UserInfoContainer>
      </UserContainer>
      <CarouselContainer>
        <Carousel>글</Carousel>
        <Carousel>시리즈</Carousel>
        <Carousel>소개</Carousel>
      </CarouselContainer>
    </Container>
  );
};



const Container = styled.div`
  width: 768px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const UserContainer = styled.div`
  display: flex;
  padding: 60px 0;
  border-bottom: 1px solid rgb(230,234,238);
  align-items: center;
`

const AvatarContainer = styled.div``
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`
const UserNameContainer = styled.div`
  font-size: 30px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
const UserBioContainer = styled.div`
  font-size: 20px;
`

const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Carousel = styled.div`
  margin: 60px 0;
  text-align: center;
  width: 100px;
  height: 30px;
  font-size: 24px;
  font-weight: 500; 
`
const FocusBar = styled.div<TabProps>``

export default UserHome;