import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Hashtag from "../../components/Hashtag";
import Markdown from "../../components/Markdown";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import { getPostDetailData } from "./PostDetailQueries";
import { Icon } from "../../components/Icon";
import { Helmet } from "react-helmet";

interface PostDetailPresenterProps {
  username: string;
  data?: getPostDetailData;
  loading: boolean;
  comment: string;
  makeCommentDisable: any;
  handleChangeComment: any;
  handleMakeComment: any;
  handleClickLike: any;
}

const PostDetailPresenter: FC<PostDetailPresenterProps> = ({
  username,
  data,
  loading,
  comment,
  makeCommentDisable,
  handleChangeComment,
  handleMakeComment,
  handleClickLike,
}) => {
  if (loading || (data && Object.keys(data).length === 0)) {
    return <Container></Container>;
  }

  return (
    <Container>
      <Helmet>
        <title>{data?.getPostDetail.title}</title>
      </Helmet>
      <HeaderContainer>
        <TitleContainer>{data?.getPostDetail.title}</TitleContainer>
        <InfoContainer>
          <ToUserInfo to={`/@${username}`}>{username}</ToUserInfo> ·{" "}
          {data?.getPostDetail.createdAt.slice(0, 10)}
        </InfoContainer>
        <HashtagContainer>
          {data?.getPostDetail.hashtags.map(({ name }, key) => (
            <Hashtag key={key++} name={name} />
          ))}
        </HashtagContainer>
        <LikeSidebarContainer>
          <LikeSidebar>
            <LikeContainer>
              {data?.getPostDetail.isLiked ? (
                <LikedButton onClick={handleClickLike}>
                  <Icon type={"redHeart"} />
                </LikedButton>
              ) : (
                <LikeButton onClick={handleClickLike}>
                  <Icon type={"blackHeart"} />
                </LikeButton>
              )}
              <LikeCount>{data?.getPostDetail.likeCount}</LikeCount>
            </LikeContainer>
          </LikeSidebar>
        </LikeSidebarContainer>
      </HeaderContainer>
      <BodyContainer>
        <Markdown source={data?.getPostDetail.content || ""} />
      </BodyContainer>
      <TailContainer>
        <Link to={`/@${username}`}>
          <TailAvatar url={data?.getPostDetail.user.avatar || ""} size="lg" />
        </Link>
        <TailUserInfo>
          <TailLink to={`/@${username}`}>{username}</TailLink>
          {data?.getPostDetail.user.bio}
        </TailUserInfo>
      </TailContainer>
      <Contour />
      <hr />
      <CommentMakeContainer>
        <CommentCount>{data?.getPostDetail.commentCount}개의 댓글</CommentCount>
        <CommentInput onChange={handleChangeComment} value={comment} />
        <CommentSubmit
          text={"댓글작성"}
          onClick={handleMakeComment}
          disabled={makeCommentDisable}
        />
      </CommentMakeContainer>
      <CommentsContaniner>
        {data?.getPostDetail.comments.map((comment) => (
          <CommentBox key={comment.id}>
            <CommentUser>
              <CommentProfile></CommentProfile>
              <Avatar url={comment.user.avatar} size={"md"} />
              <CommentInfo>
                <ConmentUserName>{comment.user.username}</ConmentUserName>
                <CommentDate>{comment.createdAt.slice(0, 10)}</CommentDate>
              </CommentInfo>
            </CommentUser>
            <CommentContent>
              <pre>{comment.text}</pre>
            </CommentContent>
          </CommentBox>
        ))}
      </CommentsContaniner>
    </Container>
  );
};

const Container = styled.main`
  @media (max-width: 1024px) {
    padding-left: 1rem;
    padding-right: 1rem;
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  width: 768px;
  margin: 0 auto;
  background-color: white;
  margin-top: 5rem;
`;
const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
`;
const TitleContainer = styled.div`
  @media (max-width: 1024px) {
    font-size: 2.25rem;
  }
  font-weight: 700;
  font-size: 1.5rem;
  font-size: 60px;
  line-height: 1.5;
  margin-bottom: 2rem;
`;
const InfoContainer = styled.div`
  font-size: 18px;
`; // username, createdAt
const ToUserInfo = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;
const HashtagContainer = styled.div`
  margin-top: 10px;
`;

const BodyContainer = styled.article``;
const TailContainer = styled.div`
  display: flex;
  align-items: center;
`;
const TailAvatar = styled(Avatar)``;
const TailLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: black;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
const TailUserInfo = styled.div`
  margin-left: 1rem;
  font-size: 1.5rem;
`;

const Contour = styled.hr`
  margin-top: 25px;
  width: 100%;
  border: 1px solid rgb(241, 242, 243);
`;

const CommentMakeContainer = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
`;

const CommentCount = styled.div`
  margin-bottom: 15px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 80px;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid rgb(210, 215, 220);
  border-radius: 4px;
`;

const CommentSubmit = styled(Button)`
  padding: 5px 15px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  width: 100px;
  border: none;
  margin-top: 10px;
`;

const LikeSidebarContainer = styled.div`
  position: relative;
  margin-top: 2rem;
`;

const LikeSidebar = styled.aside`
  @media (max-width: 1024px) {
    display: none;
  }
  position: absolute;
  left: -7rem;
`;

const LikeContainer = styled.div`
  width: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(248, 249, 250);
  border: 1px solid rgb(241, 243, 245);
  border-image: initial;
  border-radius: 2rem;
  padding: 0.5rem;
`;

const LikeButton = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(134, 142, 150);
  cursor: pointer;
  background-color: white;
  border: 1px solid rgb(173, 181, 189);
  border-radius: 1.5rem;

  &:hover {
    color: black;
    border: 1px solid black;
  }
`;

const LikedButton = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  background-color: rgb(32, 201, 151);
  border: 1px solid rgb(32, 201, 151);
  border-radius: 1.5rem;
`;

const LikeCount = styled.p`
  font-weight: 500;
`;

const CommentsContaniner = styled.div`
  margin-top: 2.5rem;
`;
const CommentBox = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

const CommentUser = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-box-align: center;
  align-items: center;
`;

const CommentProfile = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

const CommentInfo = styled.div`
  margin-left: 1rem;
  line-height: 1;
`;

const ConmentUserName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: rgb(52, 58, 64);
`;

const CommentDate = styled.div`
  margin-top: 0.5rem;
  color: rgb(134, 142, 150);
  font-size: 0.875rem;
`;

const CommentContent = styled.div`
  font-size: 1.125rem;
  color: rgb(34, 36, 38);
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

export default PostDetailPresenter;
