import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Hashtag from "./Hashtag";
import Skeleton from "react-loading-skeleton";
import ImageLoader from "./ImageLoader";
import { SearchPostProps } from "../interface/post";

const SearchPost: React.FC<SearchPostProps> = ({
  user: { username, avatar },
  url,
  files,
  title,
  content,
  hashtags,
  createdAt,
  commentCount,
}) => {
  const thumbnail_url = files.length > 0 ? files[0].url : null;
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
      {thumbnail_url && (
        <ImageWrapper>
          <ELink to={`/@${username}/${url}`}>
            <Image src={thumbnail_url} loadingHeight={370} />
          </ELink>
        </ImageWrapper>
      )}
      <ELink to={`/@${username}/${url}`}>
        <ETitleText text={title} />
      </ELink>
      <ContentText>{content}</ContentText>
      <HashtagContainer>
        {hashtags.map((hashtag) => (
          <Hashtag key={hashtag.id} name={hashtag.name} />
        ))}
      </HashtagContainer>
      <InfoText>
        {createdAt} {"&"} {commentCount}의 댓글
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
  a {
    color: inherit;
  }
  margin-bottom: 70px;
`;

const Header = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
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
  font-weight: 800;
  font-size: 28px;
  margin-bottom: 20px;
  text-decoration: none;
`;

const ContentText = styled.div`
  width: 100%;
  max-height: 75px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 15px;
`;

const HashtagContainer = styled.div`
  display: flex;
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

export default SearchPost;
