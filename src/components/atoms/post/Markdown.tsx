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
          image: Image,
        }}
        skipHtml={false}
        escapeHtml={false}
      />
    </Conatiner>
  );
};

function Image(props: any) {
  return <img {...props} style={{ maxWidth: "100%" }} />;
}

const InlineCodeBlock = (props: any) => {
  return <code style={{ background: "#ff0" }}>{props.value}</code>;
};

const BlockQuoteBlock = (props: any) => {
  return (
    <blockquote
      style={{
        backgroundColor: "rgb(248,249,250)",
        padding: "1rem 1rem 1rem 2rem",
        margin: 5,
        borderLeft: "4px solid rgb(32, 201, 151)",
      }}
    >
      {props.children}
    </blockquote>
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
