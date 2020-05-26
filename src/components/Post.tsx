import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Hashtag from "./Hashtag";

interface PostProps {
  key: string;
  username: string;
  avatar: string;
  file_url?: string;
  title: string;
  content: string;
  hashtags: string[];
  createdAt: string;
  commentCount: number;
}

const Post: React.FC<PostProps> = ({
  username,
  avatar,
  file_url,
  title,
  content,
  hashtags,
  createdAt,
  commentCount,
}) => {
  return (
    <Wrapper>
      <Header>
        <Link to={`/@${username}`}>
          <Avatar size="md" url={avatar} />
        </Link>
        <UserColumn>
          <ELink to={`/${username}`}>
            <FatText text={username} />
          </ELink>
        </UserColumn>
      </Header>
      {file_url && (
        <ImageWrapper>
          <Image src={file_url} />
        </ImageWrapper>
      )}

      <ETitleText text={title} />
      <ContentText>{content}</ContentText>
      <HashtagContainer>
        {hashtags.map((name) => (
          <Hashtag name={name} />
        ))}
      </HashtagContainer>
      <InfoText>
        {createdAt} {"&"} {commentCount}의 댓글
      </InfoText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  a {
    color: inherit;
  }
  margin-bottom: 70px;
`;

const Header = styled.header`
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
`;

const ELink = styled(Link)`
  user-select: none;
  text-decoration: none;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 400px;
  padding-top: 60%; /* 1:1 ratio */
  overflow: hidden;
  margin-bottom: 12px;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100%;
  height: auto;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  object-fit: cover;
`;

const ETitleText = styled(FatText)`
  font-weight: 800;
  font-size: 28px;
  margin-bottom: 20px;
`;

const ContentText = styled.div`
  width: 100%;
  max-height: 75px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 15px;
`;

const HashtagContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const InfoText = styled.span`
  font-weight: 400;
  font-size: 14px;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  margin: 10px 0px;
`;

export default Post;
