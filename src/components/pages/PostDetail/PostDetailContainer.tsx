import React, { useState, useCallback } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import {
  getPostDetailVars,
  getPostDetailData,
  MUTATION_LIKE_POST,
} from "./PostDetailQueries";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";
import { ADD_COMMENT } from "./Comment/addCommentQueries";
import PostDetailPresenter from "./PostDetailPresenter";
import { QUERY_EDIT_POST, QUERY_POST_DETAIL } from "../../../models/post";

interface PostDetailParams {
  username: string;
  posturl: string;
}

const PostDetailContainer = () => {
  const history = useHistory();
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
  const [makeCommentDisable, setMakeCommentDisable] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const [deletePostMutation] = useMutation(QUERY_EDIT_POST);
  const [commentMutation] = useMutation(ADD_COMMENT);
  const [likeMutation] = useMutation(MUTATION_LIKE_POST);

  const handleEditPost = useCallback(() => {}, []);
  const handleDeletePost = useCallback(async () => {
    console.log(postData?.getPostDetail);
    const data = postData?.getPostDetail;
    await deletePostMutation({
      variables: {
        ...data,
        hashtags: data?.hashtags.map((item) => item.name),
        action: "DELETE",
      },
    });
    window.location.href = "/";
  }, [postData]);

  const handleChangeComment = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setComment(e.target.value);
    },
    []
  );

  const handleMakeComment = useCallback(
    async (e: any) => {
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
            toast.success("댓글 작성에 성공했습니다.");
          }
          window.scrollTo(0, document.body.scrollHeight);
        } catch (e) {
          console.log(e);
          toast.error("요청을 완료할 수 없습니다. 다시 시도해주세요.");
        }
      }
      setMakeCommentDisable(false);
    },
    [postData, comment, commentMutation, refetch]
  );

  const handleClickLike = useCallback(
    async (e: any) => {
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
    },
    [postData, likeMutation, refetch]
  );
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
      handleDeletePost={handleDeletePost}
    />
  );
};

export default PostDetailContainer;
