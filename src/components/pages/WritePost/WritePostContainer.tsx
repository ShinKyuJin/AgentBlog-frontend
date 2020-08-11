import React, { useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-apollo-hooks";
import { serverUri } from "../../../Apollo/Client";
import axios from "axios";
import WritePostPresenter from "./WritePostPresenter";
import {
  QUERY_WRITE_POST,
  getPostDetail,
  QUERY_EDIT_POST,
} from "../../../models/post";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/modules";
import {
  posting_set,
  posting_addContent,
  posting_clear,
} from "../../../store/modules/posting";
import { useHistory } from "react-router-dom";

const WritePostContainer: React.FC<{ editData?: getPostDetail }> = ({
  editData,
}) => {
  const [hashtag, setHashtag] = useState<string>("");
  const id = useSelector((state: RootState) => state.posting.id);
  const isEditing = useSelector((state: RootState) => state.posting.isEditing);
  const title = useSelector((state: RootState) => state.posting.title);
  const hashtags = useSelector((state: RootState) => state.posting.hashtags);
  const content = useSelector((state: RootState) => state.posting.content);
  const series_id = useSelector((state: RootState) => state.posting.series_id);
  const thumbnail = useSelector((state: RootState) => state.posting.thumbnail);
  const url = useSelector((state: RootState) => state.posting.url);
  const myname = useSelector((state: RootState) => state.me.username);
  const dispatch = useDispatch();
  const history = useHistory();

  const textareaEl = useRef(null);

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "hashtag") setHashtag(value);
      if (name === "title" || name === "content")
        dispatch(posting_set({ key: name, value }));
    },
    [dispatch]
  );
  const handleChangeHashtags = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        if (hashtags.find((text) => text === hashtag)) {
          return toast.warning("이미 있는 해시태그입니다.");
        }
        if (hashtag.trim() !== "") {
          setHashtag("");
          dispatch(
            posting_set({ key: "hashtags", value: [...hashtags, hashtag] })
          );
        } else {
          toast.error("해시태그를 입력해주세요!");
        }
      }
    },
    [hashtag, hashtags, dispatch]
  );

  const [postingMutation] = useMutation(QUERY_WRITE_POST, {
    variables: {
      title,
      hashtags,
      content,
      series_id,
      thumbnail,
      url: title,
    },
  });

  const [editMutation] = useMutation(QUERY_EDIT_POST, {
    variables: {
      id,
      title,
      hashtags,
      content,
      series_id,
      thumbnail,
      url,
      action: "EDIT",
    },
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (title === "" || content === "") {
        toast.error("제목과 내용을 비우지 말아주세요!");
      } else {
        try {
          let newUrl: string;

          if (!isEditing) {
            const { data }: any = await postingMutation();
            newUrl = data.posting.url;
            if (!data.posting) {
              toast.error("글 작성에 실패했습니다.");
            } else {
              toast.success("글 작성에 성공했습니다.");
            }
          } else {
            const { data }: any = await editMutation();
            newUrl = data.editPost.url;
            if (!data.editPost) {
              toast.error("게시글 수정에 실패했습니다.");
            } else {
              toast.success("게시글 수정에 성공했습니다.");
              dispatch(posting_clear());
            }
          }
          history.push(`/@${myname}/${newUrl}`);
        } catch (e) {
          console.log(e);
          toast.error("요청을 완료할 수 없습니다. 다시 시도해주세요.");
        }
      }
    },
    [isEditing, title, content, myname, postingMutation, editMutation]
  );

  const handleClickHashtag = useCallback(
    (e: any) =>
      dispatch(
        posting_set({
          key: "hashtags",
          value: hashtags.filter((text) => text !== e.target.textContent),
        })
      ),
    [hashtags, dispatch]
  );

  const onUpload = useCallback(
    async (file: any) => {
      const formData = new FormData();
      formData.append("file", file, file.originalname);

      try {
        const { data } = await axios.post(serverUri + "/api/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        dispatch(posting_addContent(`\n![](${data.location})`));
      } catch (err) {
        toast.error("파일 업로드에 실패하였습니다." + err);
        return null;
      }
    },
    [dispatch]
  );

  const hanldExit = () => {
    // if (isEditing) {
    //   dispatch(posting_clear());
    // }
    history.goBack();
  };

  return (
    <WritePostPresenter
      title={title}
      hashtag={hashtag}
      hashtags={hashtags}
      content={content}
      handleChangeText={handleChangeText}
      handleChangeHashtags={handleChangeHashtags}
      handleSubmit={handleSubmit}
      handleClickHashtag={handleClickHashtag}
      hanldExit={hanldExit}
      onUpload={onUpload}
      textareaEl={textareaEl}
      isEditing={isEditing}
    />
  );
};

export default WritePostContainer;

// # state를 객체로 묶어서 저장했을 때의 문제점
// 1. 의존성 주입을 할 때 가장 큰 객체를 넘겨줘야하기 때문에 memorization 성능이 급격히 떨어진다. (내용 100개의 항목 중 한개의 항목만 바뀌어도 전체 state를 갱신해줘야하기 때문에)
/*
export interface formProps {
  title: string;
  hashtag: string;
  hashtags: Array<string>;
  content: string;
  series_id: string;
  thumbnail: string;
  url: string;
  files: Array<string>;
}

const WritePostContainer = () => {
  const [form, setForm] = useState<formProps>({
    title: "",
    hashtag: "",
    hashtags: [],
    content: "",
    series_id: "",
    thumbnail: "",
    url: "",
    files: [],
  });

  const textareaEl = useRef(null);

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    },
    [form]
  );
  const handleChangeHashtags = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        if (form.hashtags.find((text) => text === form.hashtag)) {
          return toast.warning("이미 있는 해시태그입니다.");
        }
        if (form.hashtag.trim() !== "") {
          setForm({
            ...form,
            hashtags: [...form.hashtags.concat(form.hashtag)],
            hashtag: "",
          });
        } else {
          toast.error("해시태그를 입력해주세요!");
        }
      }
    },
    [form]
  );

  const [postingMutation] = useMutation(QUERY_WRITE_POST, {
    variables: {
      title: form.title,
      hashtags: form.hashtags,
      content: form.content,
      series_id: form.series_id,
      thumbnail: form.thumbnail,
      url: form.title,
      files: form.files,
    },
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (form.title === "" || form.content === "") {
        toast.error("제목과 내용을 비우지 말아주세요!");
      } else {
        try {
          const {
            data: { posting },
          }: any = await postingMutation();

          if (!posting) {
            toast.error("글 작성에 실패했습니다.");
          } else {
            toast.success("글 작성에 성공했습니다.");
            window.location.href = `/@${posting.user.username}/${posting.url}`;
          }
        } catch (e) {
          console.log(e);
          toast.error("요청을 완료할 수 없습니다. 다시 시도해주세요.");
        }
      }
    },
    [form, postingMutation]
  );

  const handleClickHashtag = useCallback(
    (e: any) => {
      setForm({
        ...form,
        hashtags: form.hashtags.filter((text) => text !== e.target.textContent),
      });
    },
    [form]
  );

  const onUpload = useCallback(
    async (file: any) => {
      const formData = new FormData();
      formData.append("file", file, file.originalname);

      try {
        const { data } = await axios.post(serverUri + "/api/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        setForm({
          ...form,
          content: form.content.concat(`\n![](${data.location})`),
        });
      } catch (err) {
        toast.error("파일 업로드에 실패하였습니다." + err);
        return null;
      }
    },
    [form]
  );

  return (
    <WritePostPresenter
      form={form}
      handleChangeText={handleChangeText}
      handleChangeHashtags={handleChangeHashtags}
      handleSubmit={handleSubmit}
      handleClickHashtag={handleClickHashtag}
      onUpload={onUpload}
      textareaEl={textareaEl}
    />
  );
};
*/
