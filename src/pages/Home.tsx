import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomePostList from "../containers/HomePostList/HomePostList";
import Sidebar from "../components/Sidebar";
import Theme from "../styles/theme";
import { useLocation } from "react-router-dom";
import PageTab from "../components/PageTab";
import { Icon } from "../components/Icon";

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
      <PageTab
        {...{ tabNum, setTabNum }}
        tabItems={[
          {
            title: "Agent Blog",
            url: "/",
            component: (
              <>
                <Icon type={"trend"} size={18} />
                <TabText>트렌딩</TabText>
              </>
            ),
          },
          {
            title: "최신포스트",
            url: "/recent",
            component: (
              <>
                <Icon type={"time"} size={18} />
                <TabText>최신</TabText>
              </>
            ),
          },
        ]}
      />

      <ContentContainer>
        <HomePostList postType={tabNum === 0 ? "trend" : "recent"} />
        <Sidebar />
      </ContentContainer>
    </Container>
  );
};

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

const TabText = styled.div`
  margin-left: 0.5rem;
`;

export default Home;
