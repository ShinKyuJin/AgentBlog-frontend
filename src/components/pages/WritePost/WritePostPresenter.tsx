import React, { FC } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Hashtag from "../../atoms/post/Hashtag";
import Button from "../../atoms/theme/Button";
import Markdown from "../../atoms/post/Markdown";
import { toast } from "react-toastify";
import PostingToolbars from "../../modules/PostingToolbars";

interface WritePostPresenterProps {
  title: string;
  hashtag: string;
  hashtags: Array<string>;
  content: string;
  handleChangeText: any;
  handleChangeHashtags: (
    e: React.KeyboardEvent<Element>
  ) => string | number | undefined;
  handleSubmit: (e: React.FormEvent<Element>) => Promise<void>;
  handleClickHashtag: (e: any) => void;
  hanldExit: any;
  onUpload: any;
  textareaEl: React.RefObject<HTMLTextAreaElement>;
  hanldToolbarButton: any;
  isEditing: boolean;
}

const WritePostPresenter: FC<WritePostPresenterProps> = ({
  title,
  hashtag,
  hashtags,
  content,
  handleChangeText,
  handleChangeHashtags,
  handleSubmit,
  handleClickHashtag,
  hanldExit,
  onUpload,
  textareaEl,
  hanldToolbarButton,
  isEditing,
}) => {
  const showTagInfo = React.useCallback(
    () =>
      toast.dark(
        "쉼표 혹은 엔터를 눌러 해시태그를 등록할 수 있습니다.\n등록된 태그는 클릭하면 삭제됩니다.",
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
        {hashtags.map((text) => (
          <Hashtag
            key={text}
            name={text}
            isLink={false}
            onClick={handleClickHashtag}
          />
        ))}
        <HashtagEditor
          value={hashtag}
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
    [
      hashtags,
      hashtag,
      handleClickHashtag,
      dismissInfo,
      showTagInfo,
      handleChangeHashtags,
      handleChangeText,
    ]
  );

  return (
    <Container>
      <Helmet>
        {title.length > 0 ? (
          <title>(작성중) {title}</title>
        ) : (
          <title>글 작성</title>
        )}
      </Helmet>
      <Wrapper>
        {React.useMemo(
          () => (
            <TitleEditor
              value={title}
              onChange={handleChangeText}
              placeholder="제목을 입력해주세요"
              name="title"
              tabIndex={0}
            />
          ),
          [title, handleChangeText]
        )}
        <FocusBar />
        {Hashtags}
        <PostingToolbars
          onClick={hanldToolbarButton}
          onImageUpload={onUpload}
        />
        {React.useMemo(
          () => (
            <ContentEditor
              value={content}
              onChange={handleChangeText}
              ref={textareaEl}
              placeholder="내용을 입력해주세요"
              name="content"
              tabIndex={2}
            />
          ),
          [content, handleChangeText, textareaEl]
        )}
        <ButtonsWrapper>
          <ExitBtn
            text={"나가기"}
            icon={{ type: "back", size: 16 }}
            buttonType={"text"}
            colorStyle={"lightGrey"}
            onClick={hanldExit}
          />
          {React.useMemo(
            () => (
              <ConfirmBtn
                text={isEditing ? "수정하기" : "출간하기"}
                onClick={handleSubmit}
              />
            ),
            [handleSubmit, isEditing]
          )}
        </ButtonsWrapper>
      </Wrapper>
      {React.useMemo(
        () => (
          <MarkContainer>
            <TitleContainer>{title}</TitleContainer>
            <Markdown source={`${content}`} />
          </MarkContainer>
        ),
        [title, content]
      )}
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
  background-color: white;

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
  min-width: 12rem;
  padding: 0;
  margin-left: 1rem;
  margin-bottom: 10px;
  height: 40px;
  font-size: 18px;
  font-weight: 500;
  padding: 0;
  border: none;

  &:first-child {
    margin-left: 0rem;
  }

  &:focus {
    outline: none;
  }
`;

const HashtagBox = styled.div`
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const ContentEditor = styled.textarea`
  width: 100%;
  margin-top: 15px;
  height: 100%;
  font-size: 18px;
  line-height: 27px;
  resize: none;
  padding: 0;
  border: none;
  color: rgb(52, 58, 64);
  &:focus {
    outline: none;
  }
`;
const ButtonsWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.04) 0px -4px 16px 0px;
  margin: 0 -30px -30px -30px;
  padding: 10px;
  display: flex;
  align-content: center;
  justify-content: space-between;
`;

const ExitBtn = styled(Button)`
  font-size: 1.125rem;
  height: 2.5rem;
  width: 7rem;
  font-weight: 100;
`;

const ConfirmBtn = styled(Button)`
  font-size: 1.125rem;
  height: 2.5rem;
  width: 10rem;
  font-weight: bold;
`;

const TitleContainer = styled.h1`
  font-size: 2.5em;
  margin-bottom: 5rem;
`;

const MarkContainer = styled.div`
  height: 100%;
  width: 50%;
  padding: 3rem;
  overflow: scroll;
  background-color: rgb(251, 253, 252);
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
