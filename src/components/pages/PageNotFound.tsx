import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../atoms/theme/Button";

const PageNotFound = () => {
  return (
    <Container>
      404 Not Found
      <br />
      잘못된 페이지 주소입니다.
      <Link to={"/"}>
        <Button text={"홈으로"} />
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  font-size: 3rem;
  height: 50rem;
`;

export default PageNotFound;
