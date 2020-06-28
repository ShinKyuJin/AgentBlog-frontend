import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import {
  getPostDetailVars,
  QUERY_POST_DETAIL,
  getPostDetailData,
  MUTATION_LIKE_POST,
} from "./PostDetailQueries";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { ADD_COMMENT } from "./Comment/addCommentQueries";
import PostDetailPresenter from "./PostDetailPresenter";

interface PostDetailParams {
  username: string;
  posturl: string;
}

const PostDetailContainer = () => {
  const { username, posturl } = useParams() as PostDetailParams;
  const { data: postData, loading, refetch } = useQuery<
    getPostDetailData,
    getPostDetailVars
  >(QUERY_POST_DETAIL, {
    variables: {
      username: username,
      url: posturl,
    },
  });
  console.log(loading);
  console.log(postData);
  if (loading === false) {
    setTimeout(async () => await refetch(), 3000);
  }

  const [makeCommentDisable, setMakeCommentDisable] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const [commentMutation] = useMutation(ADD_COMMENT);
  const [likeMutation] = useMutation(MUTATION_LIKE_POST);

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleMakeComment = async (e: any) => {
    e.preventDefault();
    setMakeCommentDisable(true);
    if (comment !== "") {
      try {
        const { data }: any = await commentMutation({
          variables: {
            text: comment,
            postId: postData?.getPostDetail.id,
          },
        });
        await refetch();
        if (!data.addComment) {
          toast.error("댓글 작성에 실패했습니다.");
        } else {
          toast.success("댓글 작성에 성공했습니다..");
        }
        window.scrollTo(0, document.body.scrollHeight);
      } catch (e) {
        console.log(e);
        toast.error("요청을 완료할 수 없습니다. 다시 시도해주세요.");
      }
    }
    setMakeCommentDisable(false);
  };

  const handleClickLike = async (e: any) => {
    e.preventDefault();
    try {
      const {
        data: { toggleLike },
      }: any = await likeMutation({
        variables: {
          postId: postData?.getPostDetail.id,
        },
      });
      await refetch();
      if (!toggleLike) {
        toast.error("잠시 후 다시 시도해주세요.");
      }
    } catch (e) {
      console.log(e);
      toast.error("요청을 완료할 수 없습니다. 다시 시도해주세요.");
    }
  };
  return (
    <PostDetailPresenter
      username={username}
      data={postData}
      loading={loading}
      comment={comment}
      makeCommentDisable={makeCommentDisable}
      handleChangeComment={handleChangeComment}
      handleMakeComment={handleMakeComment}
      handleClickLike={handleClickLike}
    />
  );
};

export default PostDetailContainer;
