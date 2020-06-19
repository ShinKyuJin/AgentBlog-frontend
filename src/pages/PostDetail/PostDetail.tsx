import React, { useState } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import {
  getPostDetailVars,
  QUERY_POST_DETAIL,
  getPostDetailData,
  LIKE,
} from "./PostDetailQueries";
import Markdown from "../../components/Markdown";
import Avatar from "../../components/Avatar";
import Hashtag from "../../components/Hashtag";
import { ADD_COMMENT } from "./Comment/addCommentQueries";
import { toast } from "react-toastify";

interface PostDetailParams {
  username: string;
  posturl: string;
}

let key = 0;
const PostDetail = () => {
  const { username, posturl } = useParams() as PostDetailParams;
  const { data } = useQuery<getPostDetailData, getPostDetailVars>(
    QUERY_POST_DETAIL,
    {
      variables: {
        username: username,
        url: posturl,
      },
    }
  );

  const content = data?.getPostDetail.content as string;
  const avatar = data?.getPostDetail.user.avatar as string;
  const id = data?.getPostDetail.id as string;

  const [comment, setComment] = useState<string>('');
  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }

  const [commentMutation] = useMutation(
    ADD_COMMENT, {
    variables: {
      text: comment,
      postId: id
    }
  }
  );

  const handleMakeComment = async (e: any) => {
    e.preventDefault();
    if (comment !== '') {
      try {
        const { data: { addComment } }: any = await commentMutation();
        if (!addComment) {
          toast.error("댓글 작성에 실패했습니다.");
        }
      }
      catch (e) {
        console.log(e);
        toast.error("요청을 완료할 수 없습니다. 다시 시도해주세요.");
      }
    }
  }

  const mappingHashtag = data?.getPostDetail.hashtags.map(({ name }) => (
    <Hashtag key={key++} name={name} />
  ));


  const [likeMutation] = useMutation(
    LIKE, {
      variables: {
        postId: id
      }
    }
  );

  const handleClickLike = async (e: any) => {
    e.preventDefault();
    try {
      const { data: { toggleLike } }: any = await likeMutation();
      if (!toggleLike) {
        toast.error("잠시 후 다시 시도해주세요.");
      }
    } catch(e) {
      console.log(e);
      toast.error("요청을 완료할 수 없습니다. 다시 시도해주세요.");
    }
  }

  return (
    <Container>
      <HeaderContainer>
        <TitleContainer>{data?.getPostDetail.title}</TitleContainer>
        <InfoContainer>
          <ToUserInfo to={`/@${username}`}>{username}</ToUserInfo> ·{" "}
          {data?.getPostDetail.createdAt.slice(0, 10)}
        </InfoContainer>
        <HashtagContainer>{mappingHashtag}</HashtagContainer>
      </HeaderContainer>
      <BodyContainer>
        <Markdown source={content} />
      </BodyContainer>
      <TailContainer>
        <Link to={`/@${username}`}>
          <TailAvatar url={avatar} size="lg" />
        </Link>
        <TailUserInfo>
          <TailLink to={`/@${username}`}>{username}</TailLink>
          {data?.getPostDetail.user.bio}
        </TailUserInfo>
      </TailContainer>
      <Contour />
      <hr />
      <CommentMakeContainer>
        <CommentCount>
          {data?.getPostDetail.commentCount}개의 댓글
        </CommentCount>
        <CommentInput onChange={handleChangeComment} value={comment} />
        <CommentSubmit onClick={handleMakeComment}>댓글 작성</CommentSubmit>
      </CommentMakeContainer>
      <LikeSidebar>
        <LikeContainer>
          {
            data?.getPostDetail.isLiked ?
              <LikedButton onClick={handleClickLike}>
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path></svg>
              </LikedButton>
              :
              <LikeButton onClick={handleClickLike}>
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path></svg>
              </LikeButton>
          }
          <LikeCount>
            {data?.getPostDetail.likeCount}
          </LikeCount>
        </LikeContainer>
      </LikeSidebar>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
  margin: 0 auto;
  background-color: white;
  margin-top: 5rem;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
`;
const TitleContainer = styled.div`
  font-weight: 700;
  font-size: 60px;
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

const BodyContainer = styled.div``;
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
`

const CommentCount = styled.div`
  margin-bottom: 15px;  
`

const CommentInput = styled.input`
  width: 100%;
  height: 80px;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid rgb(210,215,220);
  border-radius: 4px;
`

const CommentSubmit = styled.button`
  border-radius: 4px;
  padding: 5px 15px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  display: inline;
  width: 100px;
  border: none;
  background-color: #12B886;
  margin-top: 10px;
`

const LikeSidebar = styled.div`
  position: fixed;
  top: 200px;
  left: 400px;
`
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
`

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
`

const LikedButton = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  background-color: rgb(32,201,151);
  border: 1px solid rgb(32,201,151);
  border-radius: 1.5rem;
`

const LikeCount = styled.p`
  font-weight: 500;
`

export default PostDetail;
