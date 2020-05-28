import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";

interface PostDetailParams {
  username: string;
  posturl: string;
}

const Container = styled.div``;

const markdown_input = `
\`\`\`
#include <stdio.h>

int main(void) {
  printf("Hello World\\n");
  return 0;
}
\`\`\`
`;

const PostDetail = () => {
  const { username, posturl } = useParams() as PostDetailParams;

  return (
    <Container>
      <ReactMarkdown 
        source={markdown_input}
        renderers={{
          code: CodeBlock,
          InlineCodeBlock: InlineCodeBlock,
          blockquote: BlockQuoteBlock
        }}
        skipHtml={false}
        escapeHtml={false}
      />
      PostDetail username:{username}, posturl:{posturl}
    </Container>
  );
};


const InlineCodeBlock = (props: any) => {
  return (
    <span style={{background: '#ff0'}}>
      {props.value}    
    </span>
  );
}

const BlockQuoteBlock = (props: any) => {
  return (
    <div style={{border: '1px dashed #aaa', borderRadius: 10, paddingLeft: 10, margin: 5}}>
      {props.children}
    </div>
  );
}

const CodeBlock = (props: any) => {
  return (
    <pre style={{background: '#000', color: '#FFF', padding: 10}}>
      <code>
        {props.value}
      </code>
    </pre>
  );
}

export default PostDetail;
