import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUri } from "../Apollo/Client";

interface UploaderInterface {
  onUpload: (e: string) => void;
}

const Uploader = ({ onUpload }: UploaderInterface) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const test = acceptedFiles.map(async (file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("aborted");
      reader.onerror = () => console.log("failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
      const url = await onUpload(file);
      return url;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <FileUploader>Upload your file here! </FileUploader>
      )}
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
`;

const FileUploader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Uploader;
