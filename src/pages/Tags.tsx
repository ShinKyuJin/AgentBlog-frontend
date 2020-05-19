import React from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import Input from "../components/Input";

const Container = styled.div``;
const SearchInput = styled(Input)``;

const Tags = () => {
  const search = useInput("");
  return (
    <Container>
      <SearchInput {...search} />
      Tags
    </Container>
  );
};

export default Tags;
