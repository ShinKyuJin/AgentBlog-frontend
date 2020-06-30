import marked from "marked";

export const convertMarkdownToText = (str: string) => {
  return marked(str)
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode(dec);
    });
};
