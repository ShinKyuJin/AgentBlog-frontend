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
import { toast } from "react-toastify";

interface WritePostPresenterProps {
  form: formProps;
  handleChangeText: any;
  handleChangeHashtags: (
    e: React.KeyboardEvent<Element>
  ) => string | number | undefined;
  handleSubmit: (e: React.FormEvent<Element>) => Promise<void>;
  handleClickHashtag: (e: any) => void;
  onUpload: any;
  textareaEl: React.MutableRefObject<null>;
}

const WritePostPresenter: FC<WritePostPresenterProps> = ({
  form,
  handleChangeText,
  handleChangeHashtags,
  handleSubmit,
  handleClickHashtag,
  onUpload,
  textareaEl,
}) => {
  const showTagInfo = React.useCallback(
    () =>
      toast.dark(
        "태그를 입력한 뒤 엔터를 누르시면 등록할 수 있습니다.\n등록된 태그는 클릭하면 삭제됩니다.",
        {
          position: "top-center",
          hideProgressBar: true,
          autoClose: false,
          toastId: "tagInfo",
        }
      ),
    []
  );
  const dismissInfo = React.useCallback(() => toast.dismiss("tagInfo"), []);

  const Hashtags = React.useMemo(
    () => (
      <HashtagBox>
        {form.hashtags.map((text) => {
          return (
            <Hashtag
              key={text}
              name={text}
              isLink={false}
              onClick={handleClickHashtag}
            />
          );
        })}
        <HashtagEditor
          value={form.hashtag}
          onChange={handleChangeText}
          onKeyPress={handleChangeHashtags}
          onFocus={showTagInfo}
          onBlur={dismissInfo}
          placeholder="태그를 입력해주세요"
          name="hashtag"
          tabIndex={1}
        />
      </HashtagBox>
    ),
    [form.hashtags, form.hashtag]
  );

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
          onChange={handleChangeText}
          placeholder="제목을 입력해주세요"
          name="title"
          tabIndex={0}
        />
        <FocusBar />
        {Hashtags}

        <FileContainer>
          <Uploader onUpload={onUpload} />
        </FileContainer>
        <ContentEditor
          value={form.content}
          onChange={handleChangeText}
          ref={textareaEl}
          placeholder="내용을 입력해주세요"
          name="content"
          tabIndex={2}
        />
        {React.useMemo(
          () => (
            <ButtonsWrapper>
              <ExitBtnContainer to={"/"}>
                <Icon type={"back"} size={16} />
                <ExitBtnText>나가기 </ExitBtnText>
              </ExitBtnContainer>
              <ConfirmBtn text={"출간하기"} onClick={handleSubmit} />
            </ButtonsWrapper>
          ),
          []
        )}
      </Wrapper>
      <MarkContainer>
        {React.useMemo(
          () => (
            <h1>{form.title}</h1>
          ),
          [form.title]
        )}
        <Markdown source={`${form.content}`} />
      </MarkContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 0px);
  flex-wrap: no-wrap;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: 2rem 3rem;

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
  width: 12rem;
  padding: 0;
  margin-left: 1rem;
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
  font-size: 1.125rem;
  resize: none;
  padding: 0;
  border: none;

  &:focus {
    outline: none;
  }
`;
const ButtonsWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.04) 0px -4px 16px 0px;
  margin: -30px;
  padding: 10px;
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

const FocusBar = styled.div`
  width: 4rem;
  height: 0.5rem;
  background: rgb(52, 58, 64);
  margin: 1rem 0rem;
`;

export default WritePostPresenter;
