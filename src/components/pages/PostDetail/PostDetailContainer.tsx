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
import { useDispatch } from "react-redux";
import { posting_put } from "../../../store/modules/posting";
import { LOGIN_QUERY } from "../../../shared/App";

interface PostDetailParams {
  username: string;
  posturl: string;
}

const PostDetailContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn: boolean = useQuery(LOGIN_QUERY).data.isLoggedIn;
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

  const handleEditPost = useCallback(() => {
    const data = postData?.getPostDetail;
    if (data) {
      dispatch(
        posting_put({
          isEditing: true,
          id: data.id,
          content: data.content,
          hashtags: data.hashtags.map((t) => t.name),
          series_id: data.series?.id || "",
          thumbnail: data.thumbnail,
          title: data.title,
          url: data.url,
        })
      );
    }
    history.push("/write");
  }, [dispatch, history, postData]);
  const handleDeletePost = useCallback(async () => {
    const isConfirmed = confirm("정말로 게시물을 삭제하시겠습니까?");
    if (!isConfirmed) return false;

    const data = postData?.getPostDetail;
    await deletePostMutation({
      variables: {
        ...data,
        hashtags: data?.hashtags.map((item) => item.name),
        action: "DELETE",
      },
    });
    window.location.href = "/";
  }, [postData, deletePostMutation]);

  const handleChangeComment = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setComment(e.target.value);
    },
    []
  );

  const handleMakeComment = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (!isLoggedIn) {
        toast.error("로그인을 먼저 해주세요.");
        return;
      }
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
    [postData, comment, commentMutation, refetch, isLoggedIn]
  );

  const handleClickLike = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (!isLoggedIn) {
        toast.error("로그인을 먼저 해주세요.");
        return;
      }
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
    [postData, likeMutation, refetch, isLoggedIn]
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
      handleEditPost={handleEditPost}
    />
  );
};

export default PostDetailContainer;
