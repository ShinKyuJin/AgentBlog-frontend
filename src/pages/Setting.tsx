import React from "react";
import styled from "styled-components";

const Setting = () => {
  return <Container>Setting</Container>;
};

const Container = styled.div`
  ${(prop) => prop.theme.responsiveContainer}
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 2rem;
`;

export default Setting;
