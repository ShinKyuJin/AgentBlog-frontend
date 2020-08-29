import React from "react";
import styled from "styled-components";

const PostingToolbars: React.FC<{ onClick: any; onImageUpload: any }> = ({
  onClick,
  onImageUpload,
}) => {
  return (
    <ToolbarContainer>
      <ToolbarItem name={"h1"} onClick={onClick}>
        H<sub>1</sub>
      </ToolbarItem>
      <ToolbarItem name={"h2"} onClick={onClick}>
        H<sub>2</sub>
      </ToolbarItem>
      <ToolbarItem name={"h3"} onClick={onClick}>
        H<sub>3</sub>
      </ToolbarItem>
      <ToolbarItem name={"h4"} onClick={onClick}>
        H<sub>4</sub>
      </ToolbarItem>
      <ToolbarSep />
      <ToolbarItem name={"bold"} onClick={onClick}>
        <ToolbarIcon xmlns="http://www.w3.org/2000/svg">
          <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
        </ToolbarIcon>
      </ToolbarItem>
      <ToolbarItem name={"italic"} onClick={onClick}>
        <ToolbarIcon xmlns="http://www.w3.org/2000/svg">
          <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
        </ToolbarIcon>
      </ToolbarItem>
      <ToolbarItem name={"del"} onClick={onClick}>
        <ToolbarIcon xmlns="http://www.w3.org/2000/svg">
          <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" />
        </ToolbarIcon>
      </ToolbarItem>
      <ToolbarSep />
      <ToolbarItem name={"quote"} onClick={onClick}>
        <ToolbarIcon xmlns="http://www.w3.org/2000/svg">
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
        </ToolbarIcon>
      </ToolbarItem>
      <ToolbarItem name={"link"} onClick={onClick}>
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
          onChange={onImageUpload}
          hidden
        />
        <ToolbarIcon xmlns="http://www.w3.org/2000/svg">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </ToolbarIcon>
      </ToolbarItem>
      <ToolbarItem name={"codeBlock"} onClick={onClick}>
        <ToolbarIcon xmlns="http://www.w3.org/2000/svg">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
        </ToolbarIcon>
      </ToolbarItem>
    </ToolbarContainer>
  );
};
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

export default PostingToolbars;
