import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { QUERY_USER_HOME } from "./UserHomeQueries";
import { useQuery } from "react-apollo-hooks";
import Avatar from "../../components/Avatar";

interface UserHomeParams {
  username: string;
}

interface seeUser {
  avatar: string;
  bio: string;
  posts: {
    title: string;
    hashtags: string[];
    commentCount: number;
    createdAt: string;
    thumbnail: string;
  }
}

interface seeUserData {
  seeUser: seeUser;
}

interface seeUserVar {
  username: string;
}

const UserHome = () => {
  const { username } = useParams() as UserHomeParams;
  const { data } = useQuery<seeUserData, seeUserVar>(
    QUERY_USER_HOME,
    {
      variables: { username: username },
    }
  );
  console.log(data?.seeUser.avatar as string);
  const avatar = data?.seeUser.avatar as string;
  
  return (
    <Container>
      <Helmet>
        <title>Agents Blog!</title>
      </Helmet>
      <Header>
        <AvatarContainer>
            <Avatar url={data?.seeUser.avatar} size="lg" />
        </AvatarContainer>
      </Header>
    </Container>
  );
};

const Container = styled.div`
  width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
`

const AvatarContainer = styled.div``
const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ImageContainer = styled.div`

`

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  object-fit: cover;
`

export default UserHome;
