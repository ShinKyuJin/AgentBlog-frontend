import React from 'react';
import styled from 'styled-components';
import Avatar from "./Avatar";

interface PostCardProps {
  file_url: string | null;
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
  avatar: string;
  username: string;
}

const PostCard: React.FC<PostCardProps> = ({
  file_url,
  title,
  content,
  createdAt,
  commentCount,
  avatar,
  username
}) => (
    <Container>
      <ImageContainer>
        <Image src={file_url ? file_url: undefined} />
      </ImageContainer>
      <ContentContainer>
        {title}
        {content}
      </ContentContainer>
      <DateContainer>
        {createdAt} · {commentCount}
      </DateContainer>
      <UserInfoContainer>
        <Avatar size={`sm`} url={avatar} /> by {username}
      </UserInfoContainer>
    </Container>
);

const Container = styled.div`
  width: 320px;
  margin: 1rem;
`

const ImageContainer = styled.div`
  width: 100%;
  height: 167px;
  position: relative;
`

const Image = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`

const ContentContainer = styled.div`
  padding: 10px;
  padding-bottom: 0;
`

const DateContainer = styled.div`
  padding-bottom: 10px;
`

const UserInfoContainer = styled.div`
  padding: 3px 10px;
`


export default PostCard;