import React, { useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { QUERY_WRITE_POST } from "./WritePostQueries";
import { useMutation } from "react-apollo-hooks";
import { serverUri } from "../../Apollo/Client";
import axios from "axios";
import WritePostPresenter from "./WritePostPresenter";

export interface formProps {
  series_id: string;
  thumbnail: string;
  url: string;
  files: Array<string>;
}

const WritePostContainer = () => {
  const [form, setForm] = useState<formProps>({
    series_id: "",
    thumbnail: "",
    url: "",
    files: [],
  });
  const [title, setTitle] = useState<string>("");
  const [hashtag, setHashtag] = useState<string>("");
  const [hashtags, setHashtags] = useState<Array<string>>([]);
  const [content, setContent] = useState<string>("");

  const textareaEl = useRef(null);

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.name === "title") setTitle(e.target.value);
      if (e.target.name === "hashtag") setHashtag(e.target.value);
      if (e.target.name === "content") setContent(e.target.value);
    },
    []
  );
  const handleChangeHashtags = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        if (hashtags.find((text) => text === hashtag)) {
          return toast.warning("이미 있는 해시태그입니다.");
        }
        if (hashtag.trim() !== "") {
          setHashtag("");
          setHashtags([...hashtags, hashtag]);
        } else {
          toast.error("해시태그를 입력해주세요!");
        }
      }
    },
    [hashtag, hashtags]
  );

  const [postingMutation] = useMutation(QUERY_WRITE_POST, {
    variables: {
      title: title,
      hashtags: hashtags,
      content: content,
      series_id: form.series_id,
      thumbnail: form.thumbnail,
      url: title,
      files: form.files,
    },
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (title === "" || content === "") {
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
    [title, content, postingMutation]
  );

  const handleClickHashtag = useCallback(
    (e: any) =>
      setHashtags(hashtags.filter((text) => text !== e.target.textContent)),
    [hashtags]
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
        setContent(content.concat(`\n![](${data.location})`));
      } catch (err) {
        toast.error("파일 업로드에 실패하였습니다." + err);
        return null;
      }
    },
    [content]
  );

  return (
    <WritePostPresenter
      form={form}
      title={title}
      hashtag={hashtag}
      hashtags={hashtags}
      content={content}
      handleChangeText={handleChangeText}
      handleChangeHashtags={handleChangeHashtags}
      handleSubmit={handleSubmit}
      handleClickHashtag={handleClickHashtag}
      onUpload={onUpload}
      textareaEl={textareaEl}
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
