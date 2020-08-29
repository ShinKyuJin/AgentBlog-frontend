import marked from "marked";
import Axios from "axios";
import { serverUri } from "../Apollo/Client";

export const convertMarkdownToText = (str: string) => {
  return marked(str)
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode(dec);
    });
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file, file.name);
  return await Axios.post(serverUri + "/api/upload", formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

export const DateToYYYYMMDD = (date: string) => {
  const tokens = date.slice(0, 10).split("-");
  return `${tokens[0]}년 ${tokens[1]}월 ${tokens[2]}일`;
};
