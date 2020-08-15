import React, { FC } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Hashtag from "../../atoms/post/Hashtag";
import Button from "../../atoms/theme/Button";
import Markdown from "../../atoms/post/Markdown";
import { Icon } from "../../atoms/theme/Icon";
import { toast } from "react-toastify";

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
        "쉼표 혹은 엔터를 눌러 해시태그 등록할 수 있습니다.\n등록된 태그는 클릭하면 삭제됩니다.",
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
        <ToolbarContainer>
          <ToolbarItem name={"h1"} onClick={hanldToolbarButton}>
            H<sub>1</sub>
          </ToolbarItem>
          <ToolbarItem name={"h2"} onClick={hanldToolbarButton}>
            H<sub>2</sub>
          </ToolbarItem>
          <ToolbarItem name={"h3"} onClick={hanldToolbarButton}>
            H<sub>3</sub>
          </ToolbarItem>
          <ToolbarItem name={"h4"} onClick={hanldToolbarButton}>
            H<sub>4</sub>
          </ToolbarItem>
          <ToolbarSep />
          <ToolbarItem name={"bold"} onClick={hanldToolbarButton}>
            <ToolbarIcon xmlns="http://www.w3.org/2000/svg">
              <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
            </ToolbarIcon>
          </ToolbarItem>
          <ToolbarItem name={"italic"} onClick={hanldToolbarButton}>
            <ToolbarIcon xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
            </ToolbarIcon>
          </ToolbarItem>
          <ToolbarItem name={"del"} onClick={hanldToolbarButton}>
            <ToolbarIcon xmlns="http://www.w3.org/2000/svg">
              <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" />
            </ToolbarIcon>
          </ToolbarItem>
          <ToolbarSep />
          <ToolbarItem name={"quote"} onClick={hanldToolbarButton}>
            <ToolbarIcon xmlns="http://www.w3.org/2000/svg">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
            </ToolbarIcon>
          </ToolbarItem>
          <ToolbarItem name={"link"} onClick={hanldToolbarButton}>
            <ToolbarIcon xmlns="http://www.w3.org/2000/svg">
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
            </ToolbarIcon>
          </ToolbarItem>
          <ToolbarItem
            name={"uploadImage"}
            onClick={() => document.getElementById("fileid")?.click()}
          >
            <input
              id={"fileid"}
              type={"file"}
              accept={"image/*"}
              onChange={onUpload}
              hidden
            />
            <ToolbarIcon xmlns="http://www.w3.org/2000/svg">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </ToolbarIcon>
          </ToolbarItem>
          <ToolbarItem name={"codeBlock"} onClick={hanldToolbarButton}>
            <ToolbarIcon xmlns="http://www.w3.org/2000/svg">
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
            </ToolbarIcon>
          </ToolbarItem>
        </ToolbarContainer>
        {React.useMemo(
          () => (
            <ContentEditor
              value={content}
              onChange={handleChangeText}
              onKeyUp={(e: any) =>
                console.log(
                  e.target.selectionStart + "~" + e.target.selectionEnd
                )
              }
              onClick={(e: any) =>
                console.log(
                  e.target.selectionStart + "~" + e.target.selectionEnd
                )
              }
              ref={textareaEl}
              placeholder="내용을 입력해주세요"
              name="content"
              tabIndex={2}
            />
          ),
          [content, handleChangeText, textareaEl]
        )}
        <ButtonsWrapper>
          <ExitBtnContainer onClick={hanldExit}>
            <Icon type={"back"} size={16} />
            <ExitBtnText>나가기 </ExitBtnText>
          </ExitBtnContainer>
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
  font-size: 1.2rem;
  line-height: 1.5;
  resize: none;
  padding: 0;
  border: none;

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

const ConfirmBtn = styled(Button)`
  font-size: 1.125rem;
  height: 2.5rem;
  width: 10rem;
  font-weight: bold;
`;

const ExitBtnContainer = styled.div`
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

const ToolbarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
`;

const ToolbarSep = styled.div`
  width: 1px;
  height: 1.25rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  background: rgb(206, 212, 218);
`;

const ToolbarItem = styled.button`
  display: flex;
  width: 3rem;
  height: 3rem;
  font: 400 13.3333px Arial;
  font-size: 1rem;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  border: 0px;
  background-color: white;
  color: rgb(134, 142, 150) !important;
  &:hover {
    color: rgb(33, 37, 41) !important;
    background: rgb(248, 249, 250) !important;
  }
  transition: all 0.05s ease-in 0s;
  cursor: pointer;
`;

const ToolbarIcon = styled.svg`
  stroke: currentColor;
  fill: currentColor;
  stroke-width: 0;
  height: 24px;
  width: 24px;
`;

const FileContainer = styled.div`
  height: 30px;
`;

const TitleContainer = styled.h1`
  font-size: 2.5em;
  margin-bottom: 5rem;
`;

const MarkContainer = styled.div`
  height: 100%;
  width: 50%;
  padding: 4rem;
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
