import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { QUERY_WRITE_POST } from "./WritePostQueries";
import { useMutation } from "react-apollo-hooks";

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
    title: '',
    hashtag: '',
    hashtags: [],
    content: '',
    series_id: '',
    thumbnail: '',
    url: '',
    files: []
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => { setForm({ ...form, title:e.target.value }); }
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setForm({ ...form, content: e.target.value }); }
  const handleChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => { setForm({ ...form, hashtag: e.target.value }); }
  const handleChangeHashtags = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (form.hashtag !== '') {
        setForm ({
          ...form,
          hashtags: [...form.hashtags.concat(form.hashtag)],
          hashtag: ''
        })
      }
      else {
        toast.error('해시태그를 입력해주세요!');
      }
    }
  }

  const [postingMutation] = useMutation(QUERY_WRITE_POST, {
    variables: {
      title: form.title,
      hashtags: form.hashtags,
      content: form.content,
      series_id: form.series_id,
      thumbnail: form.thumbnail,
      url: form.title,
      files: form.files
    }
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.title === '' || form.content === '') {
      toast.error('제목과 내용을 비우지 말아주세요!');
    }
    else {
      try {
        const { data: { posting } }: any = await postingMutation();
        
        if (!posting) {
          toast.error('글 작성에 실패했습니다.');
        }
        else {
          toast.success('글 작성에 성공했습니다.');
          window.location.href = `/@${posting.user.username}/${posting.url}`;
        }
      }
      catch (e) {
        console.log(e);
        toast.error('요청을 완료할 수 없습니다. 다시 시도해주세요.');
      }
    }
  }

  const handleClickHashtag = (e: any) => {
    setForm ({
      ...form,
      hashtags: [...form.hashtags.filter((text) => text !== e.target.textContent)]
    })
  }
  const hashtags = form.hashtags.map((text) => {
    return (
      <Hashtag key={count++} onClick={handleClickHashtag}>
        {text}
      </Hashtag>
    );
  });


  return (
    <Container>
      <Helmet>
        {
          form.title.length > 0 ?
            <title>(작성중) {form.title}</title>
            : <title>글 작성</title>
        }
      </Helmet>
      <Wrapper>
        <TitleEditor 
          value={form.title}
          onChange={handleChangeTitle}
          placeholder="제목을 입력해주세요"
        />
        <HashtagBox>
          {hashtags}
        </HashtagBox>
        <HashtagEditor 
          value={form.hashtag}
          onChange={handleChangeHashtag}
          onKeyPress={handleChangeHashtags}
          placeholder="해시태그"
        />
        <ContentEditor
          value={form.content}
          onChange={handleChangeContent}
          placeholder="내용을 입력해주세요"
        />
        <ConfirmWrapper>
          <ConfirmBtn onClick={handleSubmit}>출간하기</ConfirmBtn>
        </ConfirmWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 90px);
  flex-wrap: no-wrap;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
`

const TitleEditor = styled.input`
  width: 100%;
  height: 15%;
  padding: 0;
`
const HashtagEditor = styled.input`
  width: 100%;
  padding: 0;
`
const Hashtag = styled.span`
  display: inline;
  border-radius: 15px;
  color: rgb(12, 166, 120);
  background-color: rgb(241, 243, 245);
  padding: 10px;
  font-size: 18px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }

  & + & {
    margin: 0 5px;
  }
`
const HashtagBox = styled.div`
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
`

const ContentEditor = styled.textarea`
  width: 100%;
  height: 80%;
  resize: none;
  padding: 0;
`
const ConfirmWrapper = styled.div`
  height: 5%;
  display: flex;
  flex-direction: row-reverse;
`

const ConfirmBtn = styled.button`

`


export default WritePost;
