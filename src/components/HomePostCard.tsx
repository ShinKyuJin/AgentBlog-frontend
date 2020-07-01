import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import ImageLoader from "./ImageLoader";
import Skeleton from "react-loading-skeleton";
import { HomePostProps } from "../interface/post";
import { convertMarkdownToText } from "../shared/utils";

interface PostCardProps {
  postInfo?: HomePostProps;
}

const HomePostCard: React.FC<PostCardProps> = ({ postInfo }) => {
  const [thumbnailError, setThumbnailError] = useState(false);

  if (!postInfo) {
    return (
      <Container>
        <Skeleton height={400} />
      </Container>
    );
  } else {
    const thumbnail = postInfo.thumbnail
      ? postInfo.thumbnail
      : postInfo.files.length > 0
      ? postInfo.files[0].url
      : null;
    const description = postInfo.description
      ? postInfo.description
      : convertMarkdownToText(postInfo.content);
    return (
      <Container>
        {thumbnail && !thumbnailError && (
          <ImageContainer to={`/@${postInfo.user.username}/${postInfo.url}`}>
            <Image
              src={thumbnail}
              loadingHeight={177}
              onError={() => setThumbnailError(true)}
            />
          </ImageContainer>
        )}

        <PostInfoContainer>
          <ContentContainer to={`/@${postInfo.user.username}/${postInfo.url}`}>
            <TitleCon>{postInfo.title}</TitleCon>
            <ContentCon>{description}</ContentCon>
          </ContentContainer>
          <RestInfoContainer>
            {postInfo.createdAt.slice(0, 10)} · {postInfo.commentCount}개의 댓글
          </RestInfoContainer>
        </PostInfoContainer>
        <UserInfoContainer to={`/@${postInfo.user.username}`}>
          <Avatar size="sm" url={postInfo.user.avatar} />
          &nbsp;
          <AvatarBy>by</AvatarBy>&nbsp;
          <AvatarUsername>{postInfo.user.username}</AvatarUsername>
          <LikesCon>♥&nbsp;{postInfo.likeCount}</LikesCon>
        </UserInfoContainer>
      </Container>
    );
  }
};

const Container = styled.article`
  @media (max-width: 944px) {
    width: calc(50% - 2rem);
  }

  @media (max-width: 767px) {
    width: 100%;
    margin: 0px 0px 1rem 0px;
  }
  width: 20rem;
  margin: 1rem;

  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 6px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;

  -webkit-transition: box-shadow 0.25s ease-in 0s,
    -webkit-transform 0.25s ease-in 0s;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;
  }
  @media (min-width: 944px) {
    &:hover {
      transform: translateY(-10px);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;
    }
  }
`;

const ImageContainer = styled(Link)`
  position: relative;
  padding-bottom: 55%;
  width: 100%;
  max-height: 177px;
`;

const Image = styled(ImageLoader)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  display: block;
  object-fit: cover;
`;

const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  flex: 1 1 0%;
`;

const ContentContainer = styled(Link)`
  color: black;
  text-decoration: none;

  &:focus {
    color: black;
  }
`;

const RestInfoContainer = styled.div`
  font-size: 13px;
  color: rgb(134, 142, 150);
`;

const UserInfoContainer = styled(Link)`
  padding: 0 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: black;
  text-decoration: none;
  border-top: 1px solid rgb(240, 240, 240);
  flex-direction: row;

  &:focus {
    color: black;
  }
`;

const LikesCon = styled.div`
  font-size: 0.875rem;
  position: absolute;
  right: 16px;
`;

const TitleCon = styled.b`
  font-size: 1rem;
  line-height: 1.5;
`;

const ContentCon = styled.p`
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.5rem;
  height: 1.5rem * 3;
  font-size: 0.875rem;
  color: rgb(73, 80, 87);
`;

const AvatarBy = styled.p`
  color: rgb(134, 142, 150);
  font-size: 14px;
`;
const AvatarUsername = styled.p`
  font-size: 14px;
  font-weight: 550;
`;

export default HomePostCard;
