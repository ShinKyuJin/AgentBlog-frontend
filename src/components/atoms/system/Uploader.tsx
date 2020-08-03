import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

interface UploaderInterface {
  onUpload: (file: any) => void;
}

const Uploader = ({ onUpload }: UploaderInterface) => {
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      //const reader = new FileReader();
      // reader.onabort = () => console.log("aborted");
      // reader.onerror = () => console.log("failed");
      // reader.onload = () => {
      //   const binaryStr = reader.result;
      //   console.log(binaryStr);
      // };
      // reader.readAsArrayBuffer(file);
      onUpload(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <DropBox>드래그해서 사진을 올리세요! </DropBox>
      ) : (
        <FileUploader>사진을 여기에 놔주세요 </FileUploader>
      )}
    </Container>
  );
};
const DropBox = styled.div``;

const Container = styled.div`
  border: 1px solid black;
`;

const FileUploader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Uploader;
