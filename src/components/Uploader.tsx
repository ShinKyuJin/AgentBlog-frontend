import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUri } from "../Apollo/Client";

const Uploader = () => {
  const [urlList, setUrlList] = useState<string[]>([]);
  const onDrop = useCallback(async (acceptedFiles) => {
    console.log(acceptedFiles);
    const test = acceptedFiles.map(async (file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("aborted");
      reader.onerror = () => console.log("failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
      const url = await uploadPhoto(file);
      setUrlList([...urlList, url]);
      return url;
    });
    console.log(test);
  }, []);

  const uploadPhoto = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file, file.originalname);

    try {
      const { data } = await axios.post(serverUri + "/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log(data.location);
      return data.location;
    } catch (err) {
      toast.error("파일 업로드에 실패하였습니다." + err);
      return null;
    }
  };

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
      {urlList &&
        urlList.map((url) => (
          <img src={url} key={url} width={32} height={32} />
        ))}
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
