import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { QUERY_WRITE_POST } from "./WritePostQueries";
import { useMutation } from "react-apollo-hooks";
import { serverUri } from "../../Apollo/Client";
import axios from "axios";
import { WritePostPresenter } from "./WritePostPresenter";

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

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, title: e.target.value });
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, content: e.target.value });
  };
  const handleChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, hashtag: e.target.value });
  };
  const handleChangeHashtags = (e: React.KeyboardEvent) => {
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
  };

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
  const handleSubmit = async (e: React.FormEvent) => {
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
  };

  const handleClickHashtag = (e: any) => {
    setForm({
      ...form,
      hashtags: [
        ...form.hashtags.filter((text) => text !== e.target.textContent),
      ],
    });
  };

  const onUpload = async (file: any) => {
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
  };

  return (
    <WritePostPresenter
      form={form}
      handleChangeTitle={handleChangeTitle}
      handleChangeContent={handleChangeContent}
      handleChangeHashtag={handleChangeHashtag}
      handleChangeHashtags={handleChangeHashtags}
      handleSubmit={handleSubmit}
      handleClickHashtag={handleClickHashtag}
      onUpload={onUpload}
      textareaEl={textareaEl}
    />
  );
};

export default WritePostContainer;
