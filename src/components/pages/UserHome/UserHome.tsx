import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useParams, useLocation } from "react-router-dom";
import { seeUser, QUERY_USER_HOME } from "./UserHomeQueries";
import { useQuery } from "react-apollo-hooks";
import Avatar from "../../atoms/user/Avatar";

interface UserHomeParams {
  username: string;
}

interface seeUserData {
  seeUser: seeUser;
}

interface seeUserVar {
  username: string;
}

const UserHome = () => {
  const { username } = useParams() as UserHomeParams;
  const location = useLocation();
  const [tabNum, setTabNum] = useState(location.pathname === "/recent" ? 1 : 0);

  const { data } = useQuery<seeUserData, seeUserVar>(QUERY_USER_HOME, {
    variables: {
      username,
    },
  });

  if (data && !data.seeUser) {
    return <FallbackContainer>없는 유저입니다!</FallbackContainer>;
  }

  const avatar = data?.seeUser.avatar as string;
  const titles = [
    username + " - Agent Blog",
    username + " / 시리즈 - Agent Blog",
    username + " / 소개 - Agent Blog",
  ];
  return (
    <Container>
      <Helmet>
        <title>{titles[tabNum]}</title>
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
        <TabContainer>
          <TabButton
            onClick={() => {
              setTabNum(0);
              window.history.replaceState(null, titles[0], location.pathname);
            }}
            tabNum={tabNum}
          >
            <TabText>글</TabText>
          </TabButton>
          <TabButton
            onClick={() => {
              setTabNum(1);
              window.history.replaceState(
                null,
                titles[1],
                location.pathname + "/series"
              );
            }}
            tabNum={tabNum}
          >
            <TabText>시리즈</TabText>
          </TabButton>
          <TabButton
            onClick={() => {
              setTabNum(2);
              window.history.replaceState(
                null,
                titles[2],
                location.pathname + "/about"
              );
            }}
            tabNum={tabNum}
          >
            <TabText>소개</TabText>
          </TabButton>
          <FocusBar tabNum={tabNum} />
        </TabContainer>
      </CarouselContainer>
    </Container>
  );
};
const FallbackContainer = styled.div`
  width: 100%;
  height: 20rem;
  font-size: 3rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.main`
  width: 768px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const UserContainer = styled.div`
  display: flex;
  padding: 60px 0;
  border-bottom: 1px solid rgb(230, 234, 238);
  align-items: center;
`;

const AvatarContainer = styled.div``;
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;
const UserNameContainer = styled.div`
  font-size: 30px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
const UserBioContainer = styled.div`
  font-size: 20px;
`;

const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabContainer = styled.div`
  width: 24rem;
  display: flex;
  flex-wrap: wrap;
`;

interface TabProps {
  tabNum: number;
}
const TabButton = styled.div<TabProps>`
  width: 8rem;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  height: 3rem;
  text-decoration: none;
  &:nth-child(${(props) => props.tabNum + 1}) {
    color: rgb(32, 201, 151);
    font-weight: bold;
  }
  color: rgb(134, 142, 150);
  cursor: pointer;
`;

const TabText = styled.div`
  margin-left: 0.5rem;
`;

const FocusBar = styled.div<TabProps>`
  width: 33%;
  height: 2px;
  bottom: 0px;
  background: rgb(32, 201, 151);
  transition: transform 0.35s cubic-bezier(0, 0, 0.1, 1.5) 0s;
  position: relative;
  transform: ${(props) => `translateX(${props.tabNum * 100}%);`};
`;

export default UserHome;
