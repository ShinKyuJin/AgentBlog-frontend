import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

interface PostDetailParams {
  username: string;
  posturl: string;
}

const Container = styled.div``;

const PostDetail = () => {
  const { username, posturl } = useParams() as PostDetailParams;

  return (
    <Container>
      PostDetail username:{username}, posturl:{posturl}
    </Container>
  );
};

export default PostDetail;
