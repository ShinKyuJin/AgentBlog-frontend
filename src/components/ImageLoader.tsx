import React, { ImgHTMLAttributes, useState } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

interface ImageLoaderProps extends ImgHTMLAttributes<HTMLImageElement> {
  loadingHeight?: string | number | undefined;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  loadingHeight,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const onLoad = () => setLoading(false);
  return (
    <>
      {loading && <Skeleton height={loadingHeight} />}
      <Image _loading={loading} onLoad={onLoad} {...props} />
    </>
  );
};

interface ImageProps {
  _loading: boolean;
}

const Image = styled.img<ImageProps>`
  display: ${(props) => (props._loading ? "none" : "inline")};
`;

export default ImageLoader;
