import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

interface MarkdownProps {
  source: string;
}

const Markdown: React.FC<MarkdownProps> = ({ source }) => {
  return (
    <Conatiner>
      <ReactMarkdown 
        source={source}
        renderers={{
          code: CodeBlock,
          InlineCodeBlock: InlineCodeBlock,
          blockquote: BlockQuoteBlock
        }}
        skipHtml={false}
        escapeHtml={false} 
        />

    </Conatiner>
  );
}

const InlineCodeBlock = (props: any) => {
  return (
    <span style={{ background: '#ff0' }}>
      {props.value}
    </span>
  );
}

const BlockQuoteBlock = (props: any) => {
  return (
    <div style={{ border: '1px dashed #aaa', borderRadius: 10, paddingLeft: 10, margin: 5 }}>
      {props.children}
    </div>
  );
}

const CodeBlock = (props: any) => {
  return (
    <pre style={{ background: '#000', color: '#FFF', padding: 10 }}>
      <code>
        {props.value}
      </code>
    </pre>
  );
}

const Conatiner = styled.div`
`

export default Markdown;