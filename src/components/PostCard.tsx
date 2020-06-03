import React from "react";
import styled, { keyframes } from "styled-components";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { seeMain } from "../containers/PostList/PostListQueries";
import ImageLoader from "./ImageLoader";
import Skeleton from "react-loading-skeleton";

interface PostCardProps {
  postInfo?: seeMain;
  loading?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ postInfo, loading = false }) => {
  if (loading)
    return (
      <Container>
        <Skeleton height={400} />
      </Container>
    );

  if (postInfo)
    return (
      <Container>
        {postInfo.thumbnail ? (
          <ImageContainer to={`/@${postInfo.user.username}/${postInfo.url}`}>
            <Image src={postInfo.thumbnail} loadingHeight={177} />
          </ImageContainer>
        ) : null}

        <PostInfoContainer>
          <ContentContainer to={`/@${postInfo.user.username}/${postInfo.url}`}>
            <TitleCon>{postInfo.title}</TitleCon>
            <ContentCon>
              {postInfo.content.length > 60
                ? postInfo.content.slice(0, 60).concat("...")
                : postInfo.content}
            </ContentCon>
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

  return <></>;
};

const Container = styled.div`
  width: 320px;
  height: 377px;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  margin: 1rem;
  flex-direction: column;
  border-radius: 8px;
  position: relative;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;

  -webkit-transition: -webkit-transform 0.4s;
  transition: transform 0.4s;
  &:hover {
    transform: translateY(-10px);
  }
`;

const ImageContainer = styled(Link)`
  position: relative;
  height: 177px;
  width: 100%;
`;

const Image = styled(ImageLoader)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: block;
  object-fit: cover;
`;
const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 16px 16px 0 16px;
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
  font-size: 14px;
  position: absolute;
  right: 16px;
`;

const TitleCon = styled.b`
  font-size: 18px;
`;
const ContentCon = styled.p``;

const AvatarBy = styled.p`
  color: rgb(134, 142, 150);
  font-size: 14px;
`;
const AvatarUsername = styled.p`
  font-size: 14px;
  font-weight: 550;
`;

export default PostCard;
