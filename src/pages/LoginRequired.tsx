import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const LoginRequired = () => {
  return (
    <Container>
      로그인이 필요한 페이지 입니다!
      <br />
      로그인을 해주세요!
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

export default LoginRequired;
