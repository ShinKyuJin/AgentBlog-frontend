import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Hashtag from "./Hashtag";
import Skeleton from "react-loading-skeleton";
import ImageLoader from "./ImageLoader";
import { SearchPostProps } from "../interface/post";
import { convertMarkdownToText } from "../shared/utils";

const SearchPostCard: React.FC<SearchPostProps> = ({
  user: { username, avatar },
  url,
  thumbnail,
  files,
  title,
  content,
  description,
  hashtags,
  createdAt,
  commentCount,
}) => {
  const thumbnail_url = thumbnail
    ? thumbnail
    : files.length > 0
    ? files[0].url
    : null;
  const descriptionText = description
    ? description
    : convertMarkdownToText(content);
  const [errorThumbnailLoading, setErrorThumbnailLoading] = useState(false);
  return (
    <Wrapper>
      <Header>
        <Link to={`/@${username}`}>
          <Avatar size="md" url={avatar} />
        </Link>
        <UserColumn>
          <ELink to={`/@${username}`}>
            <FatText text={username} />
          </ELink>
        </UserColumn>
      </Header>
      {thumbnail_url && !errorThumbnailLoading && (
        <ImageWrapper>
          <ELink to={`/@${username}/${url}`}>
            <Image
              src={thumbnail_url}
              loadingHeight={370}
              onError={() => setErrorThumbnailLoading(true)}
            />
          </ELink>
        </ImageWrapper>
      )}
      <ELink to={`/@${username}/${url}`}>
        <ETitleText text={title} />
      </ELink>
      <ContentText>
        {descriptionText.length < 150
          ? descriptionText
          : descriptionText.slice(0, 150).concat("...")}
      </ContentText>
      <HashtagContainer>
        {hashtags.map((hashtag) => (
          <Hashtag key={hashtag.id} name={hashtag.name} />
        ))}
      </HashtagContainer>
      <InfoText>
        {createdAt} {" · "} {commentCount}의 댓글
      </InfoText>
    </Wrapper>
  );
};

export const PostLoadingSkeleton = () => (
  <Wrapper>
    <div style={{ fontSize: 20, lineHeight: 2 }}>
      <Header>
        <Skeleton circle={true} height={50} width={50} />
        <UserColumn>
          <Skeleton width={300} height={40} />
        </UserColumn>
      </Header>
      <Skeleton height={370} />
      <Skeleton height={50} />
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  line-height: 1.5;
  padding-bottom: 4rem;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ELink = styled(Link)`
  text-decoration: none;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 370px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 12px;
`;

const Image = styled(ImageLoader)`
  max-width: 100%;
  width: 100%;
  height: 370px;
  position: absolute;
  top: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  object-fit: cover;
`;

const ETitleText = styled(FatText)`
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  font-size: 1.5rem;
  word-break: keep-all;
  color: ${(prop) => prop.theme.deepDarkGreyColor};
  text-decoration: none;
`;

const ContentText = styled.p`
  @media (max-width: 768px) {
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
  }
  width: 100%;
  max-height: 75px;
  font-size: 1rem;
  color: ${(prop) => prop.theme.greyColor};
  word-break: keep-all;
  overflow-wrap: break-word;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
`;

const HashtagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const InfoText = styled.span`
  font-weight: 400;
  font-size: 14px;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  margin: 10px 0px;
`;

export default SearchPostCard;
