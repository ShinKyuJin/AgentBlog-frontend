import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { QUERY_WRITE_POST } from "./WritePostQueries";
import { useMutation } from "react-apollo-hooks";
import Markdown from "../../components/Markdown";
import Uploader from "../../components/Uploader";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { Icon } from "../../components/Icon";
import Hashtag from "../../components/Hashtag";
import { serverUri } from "../../Apollo/Client";
import axios from "axios";

let count = 0;

interface writePost {
  title: string;
  hashtag: string;
  hashtags: Array<string>;
  content: string;
  series_id: string;
  thumbnail: string;
  url: string;
  files: Array<string>;
}

const WritePost = () => {
  const [form, setForm] = useState<writePost>({
    title: "",
    hashtag: "",
    hashtags: [],
    content: "",
    series_id: "",
    thumbnail: "",
    url: "",
    files: [],
  });

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
      if (form.hashtag !== "") {
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

  const hashtags = form.hashtags.map((text) => {
    return (
      <Hashtag
        key={count++}
        name={text}
        isLink={false}
        onClick={handleClickHashtag}
      />
    );
  });
  return (
    <Container>
      <Helmet>
        {form.title.length > 0 ? (
          <title>(작성중) {form.title}</title>
        ) : (
          <title>글 작성</title>
        )}
      </Helmet>
      <Wrapper>
        <TitleEditor
          value={form.title}
          onChange={handleChangeTitle}
          placeholder="제목을 입력해주세요"
        />
        <HashtagBox>{hashtags}</HashtagBox>
        <HashtagEditor
          value={form.hashtag}
          onChange={handleChangeHashtag}
          onKeyPress={handleChangeHashtags}
          placeholder="해시태그"
        />
        <FileContainer>
          <Uploader onUpload={onUpload} />
        </FileContainer>
        <ContentEditor
          value={form.content}
          onChange={handleChangeContent}
          placeholder="내용을 입력해주세요"
        />
        <ConfirmWrapper>
          <ExitBtnContainer to={"/"}>
            <Icon type={"back"} size={20} />
            <ExitBtnText>나가기 </ExitBtnText>
          </ExitBtnContainer>
          <ConfirmBtn text={"출간하기"} onClick={handleSubmit} />
        </ConfirmWrapper>
      </Wrapper>
      <MarkContainer>
        <h1>{form.title}</h1>
        <Markdown source={`${form.content}`} />
      </MarkContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 90px);
  flex-wrap: no-wrap;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: 30px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const TitleEditor = styled.input`
  width: 100%;
  height: 70px;
  font-size: 40px;
  padding: 0;
  border: none;
  font-weight: 650;

  &:focus {
    outline: none;
  }
`;
const HashtagEditor = styled.input`
  width: 100%;
  padding: 0;
  height: 40px;
  font-size: 24px;
  font-weight: 500;
  padding: 0;
  border: none;

  &:focus {
    outline: none;
  }
`;

const HashtagBox = styled.div`
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
`;

const ContentEditor = styled.textarea`
  width: 100%;
  margin-top: 15px;
  height: 100%;
  font-size: 16px;
  resize: none;
  padding: 0;
  border: none;

  &:focus {
    outline: none;
  }
`;
const ConfirmWrapper = styled.div`
  height: 5%;
  display: flex;
  align-content: center;
  justify-content: space-between;
`;

const ConfirmBtn = styled(Button)`
  font-size: 1.125rem;
  height: 2.5rem;
  width: 10rem;
  font-weight: bold;
`;

const ExitBtnContainer = styled(Link)`
  width: 7rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  border-radius: 4px;
  background-color: inherit;

  transition: background-color 0.05s;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;

const ExitBtnText = styled.div`
  margin-left: 0.8rem;
`;

const FileContainer = styled.div`
  height: 30px;
`;

const MarkContainer = styled.div`
  height: 100%;
  width: 50%;
  @media (max-width: 1024px) {
    display: none;
  }
`;

export default WritePost;
