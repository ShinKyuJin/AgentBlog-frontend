import React, { FC } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { formProps } from "./WritePostContainer";
import Hashtag from "../../components/Hashtag";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Markdown from "../../components/Markdown";
import { Icon } from "../../components/Icon";
import Uploader from "../../components/Uploader";

interface WritePostPresenterProps {
  form: formProps;
  handleChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleChangeHashtag: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeHashtags: (
    e: React.KeyboardEvent<Element>
  ) => string | number | undefined;
  handleSubmit: (e: React.FormEvent<Element>) => Promise<void>;
  handleClickHashtag: (e: any) => void;
  onUpload: any;
  textareaEl: React.MutableRefObject<null>;
}

export const WritePostPresenter: FC<WritePostPresenterProps> = ({
  form,
  handleChangeTitle,
  handleChangeContent,
  handleChangeHashtag,
  handleChangeHashtags,
  handleSubmit,
  handleClickHashtag,
  onUpload,
  textareaEl,
}) => {
  const hashtags = form.hashtags.map((text, i) => {
    return (
      <Hashtag
        key={i}
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
          ref={textareaEl}
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
