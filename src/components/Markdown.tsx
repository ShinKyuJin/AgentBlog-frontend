import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  source: string;
}

const Markdown: React.FC<MarkdownProps> = ({ source }) => {
  return (
    <Conatiner>
      <ReactMarkdown
        source={source.replace(/\n/g, "  \n")}
        renderers={{
          code: CodeBlock,
          InlineCodeBlock: InlineCodeBlock,
          blockquote: BlockQuoteBlock,
        }}
        skipHtml={false}
        escapeHtml={false}
      />
    </Conatiner>
  );
};

const InlineCodeBlock = (props: any) => {
  return <span style={{ background: "#ff0" }}>{props.value}</span>;
};

const BlockQuoteBlock = (props: any) => {
  return (
    <div
      style={{
        backgroundColor: "rgb(248,249,250)",
        padding: "1rem 1rem 1rem 2rem",
        margin: 5,
        borderLeft: "4px solid rgb(32, 201, 151)",
      }}
    >
      {props.children}
    </div>
  );
};

const CodeBlock = (props: any) => {
  return (
    <pre style={{ background: "rgb(248,249,250)", color: "#000", padding: 10 }}>
      <code>{props.value}</code>
    </pre>
  );
};

const Conatiner = styled.div``;

export default React.memo(Markdown);
