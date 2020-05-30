import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Input from "../../components/Input";
import Markdown from "../../components/Markdown";
import Button from "../../components/Button";
import { QUERY_WRITE_POST } from "./WritePostQueries";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const WritePost = () => {
  const [subject, setSubject] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtag, setHashtag] = useState<string>('');
  const [files, setFiles] = useState<File>();
  const [series_title, setSeries_title] = useState<string>('');
  const [url, setUrl] = useState<string>(subject);
  const handleChangeSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  }
  const handleChangeDetail = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(e.target.value);
  }
  const handleChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
  }
  const handleChangeHashtags = (e: React.KeyboardEvent) => {
    console.log(true);
    if (e.key === 'Enter') {
      setHashtags([...hashtags, hashtag]);
      setHashtag('');
    }
  }

  const history = useHistory();

  const [postingMutation] = useMutation(QUERY_WRITE_POST, {
    variables: {
      title: subject,
      content: detail,
      hashtags: hashtags,
      url: subject,
    }});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (subject === "" || detail === "") {
      toast.error("제목과 내용을 적어주세요.");
    }
    else {
      try {
        const { data: { posting } }: any = await postingMutation();
        
        console.log(posting);
        if (!posting) {
          toast.error("글 작성에 실패했습니다.");
        }
        else {
          toast.success("글 작성에 성공했습니다.");
          console.log(`/@${posting.user.username}/${posting.url}`)
          window.location.href = `/@${posting.user.username}/${posting.url}`
        }

      } catch (e) {
        console.log(e);
        toast.error("요청을 완료할 수 없습니다. 다시 시도해주세요.");
      }
    }
  }

  return (
    <Container>
      <Helmet>
        <title>(작성중) {subject}</title>
      </Helmet>
      <TextWrapper>
        <WriteContainer>
          <SubjectInput
            value={subject}
            onChange={handleChangeSubject}
            placeholder={`제목을 입력하세요`}
          />
          <HashtagInput
            value={hashtag}
            onChange={handleChangeHashtag}
            placeholder={`해쉬 태그를 입력하세요`}
            onKeyDown={handleChangeHashtags}
          />
          <DetailInput
            value={detail}
            onChange={handleChangeDetail}
          />
        </WriteContainer>
        <PreviewContainer>
          <Markdown
            source={`# ${subject}\n${detail}`}
          />
        </PreviewContainer>
      </TextWrapper>
      <WritePostBtn text={"작성"} onClick={handleSubmit} />
    </Container>
  );
};

const Container = styled.div`
`;

const TextWrapper = styled.div`
  display: flex;
`;

const WriteContainer = styled.div`
  border: 1px solid black;
  white-space: no-wrap;
  width: 50%;
`;

const PreviewContainer = styled.div`
  width: 50%;
  border: 1px solid black;
  word-break: break-all;
  height: 71vh;
  overflow-y: auto;
`;

const SubjectInput = styled(Input)`
  width: 100%;
  padding: 0px;
`;

const DetailInput = styled.textarea`
  width: 100%;
  white-space: no-wrap;
  border: none;
  resize: none;
  height: 60vh;
  box-sizing: border-box;
  scroll-y: auto;
`;

const HashtagInput = styled(Input)`
  width: 100%;
  padding: 0px;
`

const WritePostBtn = styled(Button)`
  width: 100%;
`;

export default WritePost;
