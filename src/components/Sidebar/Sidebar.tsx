import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { QUERY_POP_TAGS } from "./SidebarQueries";
import Footer from "../Footer";

interface getPopularHashtag {
  name: string;
}
interface SidebarData {
  getPopularHashtag: Array<getPopularHashtag>;
}

let key = 0;

const Sidebar = () => {
  const [fix, setFix] = useState<Boolean>(false);

  const { data } = useQuery<SidebarData>(QUERY_POP_TAGS);
  //console.log(data?.getPopularHashtag);
  const mappingTags = data?.getPopularHashtag.map(({ name }) => (
    <Tag to={`/tags/${name}`} key={key++}>
      #&nbsp;{name}
    </Tag>
  ));

  const handleWheel = (e: React.WheelEvent) => {
    if (e.screenY >= 90) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  return (
    <Container>
      <ContentContainer>
        <PopularTagP>인기 태그</PopularTagP>
        <Contour />
        {fix ? (
          <Tags onWheel={handleWheel}>{mappingTags}</Tags>
        ) : (
          <Tags onWheel={handleWheel}>{mappingTags}</Tags>
        )}
      </ContentContainer>
      <Footer />
    </Container>
  );
};

const Container = styled.aside`
  @media (max-width: 1440px) {
    margin-left: 3rem;
    width: 12rem;
  }

  @media (max-width: 944px) {
    display: none;
  }
  margin-left: 6rem;
  width: 16rem;

  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

const ContentContainer = styled.div`
  @media (max-width: 1440px) {
    width: 12rem;
  }
  width: 16rem;
`;

const PopularTagP = styled.b``;

const Contour = styled.hr`
  border: 1px solid rgb(233, 236, 239);
`;

const Tags = styled.p`
  display: flex;
  flex-direction: column;
`;

const Tag = styled(Link)`
  text-decoration: none;
  color: ${(prop) => prop.theme.greyColor};
  font-size: 15px;
  line-height: 1.5;

  &:focus {
    color: ${(prop) => prop.theme.greyColor};
  }

  &:hover {
    text-decoration: underline;
  }

  & + & {
    margin-top: 5px;
  }
`;

export default Sidebar;
