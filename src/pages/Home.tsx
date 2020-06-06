import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import HomePostList from "../containers/HomePostList/HomePostList";
import Sidebar from "../components/Sidebar";
import Theme from "../styles/theme";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const [tabNum, setTabNum] = useState(location.pathname === "/recent" ? 1 : 0);

  useEffect(() => {
    document.body.style.backgroundColor = Theme.homeBgColor;
    return () => {
      document.body.style.backgroundColor = Theme.bgColor;
    };
  }, []);

  return (
    <Container>
      <Helmet>
        <title>
          {tabNum === 0 ? "Agent Blog" : "최신 포스트 - Agent Blog"}
        </title>
      </Helmet>
      <TabContainer>
        <TabButton
          onClick={() => {
            setTabNum(0);
            window.history.replaceState(null, "Agent Blog", "/");
          }}
          tabNum={tabNum}
        >
          트렌딩
        </TabButton>
        <TabButton
          onClick={() => {
            setTabNum(1);
            window.history.replaceState(null, "최신포스트", "/recent");
          }}
          tabNum={tabNum}
        >
          최신
        </TabButton>
        <FocusBar tabNum={tabNum} />
      </TabContainer>
      <ContentContainer>
        <HomePostList postType={tabNum === 0 ? "trend" : "recent"} />
        <Sidebar />
      </ContentContainer>
    </Container>
  );
};

interface TabProps {
  tabNum: number;
}

const Container = styled.div`
  ${(prop) => prop.theme.responsiveContainer}
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 2rem;
`;

const ContentContainer = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const TabContainer = styled.div`
  width: 14rem;
  display: flex;
  flex-wrap: wrap;
`;

const TabButton = styled.div<TabProps>`
  width: 7rem;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  height: 3rem;
  text-decoration: none;
  &:nth-child(${(props) => props.tabNum + 1}) {
    color: rgb(52, 58, 64);
    font-weight: bold;
  }
  color: rgb(134, 142, 150);
  cursor: pointer;
`;

const FocusBar = styled.div<TabProps>`
  width: 50%;
  height: 2px;
  bottom: 0px;
  background: rgb(52, 58, 64);
  transition: transform 0.35s cubic-bezier(0, 0, 0.1, 1.5) 0s;
  position: relative;
  transform: ${(props) => `translateX(${props.tabNum * 100}%);`};
`;

export default Home;
