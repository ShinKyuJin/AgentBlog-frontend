import React from "react";
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
  const { data } = useQuery<SidebarData>(QUERY_POP_TAGS);
  console.log(data?.getPopularHashtag);
  const mappingTags = data?.getPopularHashtag.map(({ name }) => (
    <Tag to={`/tags/${name}`} key={key++}>
      #&nbsp;{name}
    </Tag>
  ));

  const handleWheel = (e: React.WheelEvent) => {};

  return (
    <Wrap>
      <Container>
        <ContentContainer>
          <PopularTagP>인기 태그</PopularTagP>
          <Contour />
          <Tags>{mappingTags}</Tags>
        </ContentContainer>
        <Footer />
      </Container>
    </Wrap>
  );
};
const Wrap = styled.div`
  width: 20%;
  min-width: 14rem;
`;

const Container = styled.aside`
  @media (max-width: 985px) {
    display: none;
  }
  display: flex;
  flex-direction: column;
  margin-left: 6rem;
  margin-right: auto;
  width: 14rem;
  margin-top: 50px;
`;

const ContentContainer = styled.div`
  width: 100%;
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
  color: rgb(73, 80, 87);
  font-size: 15px;
  line-height: 1.5;

  &:focus {
    color: rgb(73, 80, 87);
  }

  &:hover {
    text-decoration: underline;
  }

  & + & {
    margin-top: 5px;
  }
`;

export default Sidebar;
