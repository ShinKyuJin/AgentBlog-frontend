import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { useParams } from "react-router-dom";

interface PostDetailParams {
  username: string;
  posturl: string;
}

const Container = styled.div``;

const markdown_input = `

# Live demo

Changes are automatically rendered as you type.

## Table of Contents

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)]

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)
`;

const PostDetail = () => {
  const { username, posturl } = useParams() as PostDetailParams;

  return (
    <Container>
      <ReactMarkdown source={markdown_input} />
      PostDetail username:{username}, posturl:{posturl}
    </Container>
  );
};

export default PostDetail;
