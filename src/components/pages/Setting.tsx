import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Button from "../atoms/theme/Button";
import FatText from "../atoms/theme/FatText";
import DetailText from "../atoms/theme/DetailText";
import Input from "../atoms/theme/Input";
import Avatar from "../atoms/user/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/modules";

const Setting = () => {
  const [isNameBioEditing, SetIsNameBioEditing] = useState<boolean>(false);
  const disfetch = useDispatch();
  const me = useSelector((state: RootState) => state.me);

  const handleEditNameBio = () => SetIsNameBioEditing(true);
  const handleSaveNameBio = () => {
    SetIsNameBioEditing(false);
  };

  return (
    <Container>
      <Profile>
        <ImageEditContainer>
          <EAvatar size={"lg"} url={""} />
          <EButton text={"이미지 업로드"} />
          <EButton
            text={"이미지 제거"}
            style={{ color: "rgb(18, 184, 134)", background: "none" }}
          />
        </ImageEditContainer>

        <ProfileTextContainer>
          {!isNameBioEditing ? (
            <>
              <h1 style={{ margin: "0.5rem 0 0 0" }}>이름</h1>
              <DetailText text={"한 줄 소개"} />
              <EditButton onClick={handleEditNameBio}>수정</EditButton>
            </>
          ) : (
            <>
              <EInput placeholder={"이름"} style={{ fontSize: "1.5rem" }} />
              <EInput placeholder={"한 줄 소개"} />
              <EButton
                text={"저장"}
                onClick={handleSaveNameBio}
                style={{ alignSelf: "flex-end" }}
              />
            </>
          )}
        </ProfileTextContainer>
      </Profile>
      <SettingWrapper>
        <SettingRow>
          <RowResponsiveContainer>
            <SettingLabel>
              <FatText text={"블로그 제목"} />
            </SettingLabel>
            <SettingText>react.log</SettingText>
          </RowResponsiveContainer>
          <DetailText
            text={"개인 페이지의 좌측 상단에 나타나는 페이지 제목입니다."}
          />
        </SettingRow>
        <SettingRow>
          <RowResponsiveContainer>
            <SettingLabel>
              <FatText text={"이메일 주소"} />
            </SettingLabel>
            <SettingText>react.log</SettingText>
          </RowResponsiveContainer>
          <DetailText
            text={"개인 페이지의 좌측 상단에 나타나는 페이지 제목입니다."}
          />
        </SettingRow>
      </SettingWrapper>
    </Container>
  );
};

const Container = styled.main`
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 1.5rem;
  }
  @media (max-width: 1024px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  width: 768px;
  padding-bottom: 5rem;

  display: flex;
  flex-direction: column;
`;
const Profile = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
  }
  flex-direction: row;
  display: flex;
`;
const SettingWrapper = styled.div``;
const RowResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
  }
  flex-direction: row;
  display: flex;
`;
const SettingLabel = styled.div``;
const SettingText = styled.div``;
const SettingRow = styled.div`
  & + & {
    border-top: 1px solid rgb(233, 236, 239);
  }
`;
const ImageEditContainer = styled.div`
  @media (max-width: 768px) {
    align-self: center;
  }
  flex-direction: column;
  display: flex;
  padding-right: 1.5rem;
`;
const ProfileTextContainer = styled.div`
  @media (max-width: 768px) {
    border-top: 1px solid rgb(233, 236, 239);
  }
  @media (min-width: 769px) {
    border-left: 1px solid rgb(233, 236, 239);
  }

  padding-left: 1.5rem;
  flex: 1 1 0%;

  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 1rem;
  }
`;
const EditButton = styled.span`
  text-decoration: underline;
  color: rgb(18, 184, 134);
  &:focus {
    color: rgb(56, 217, 169);
  }
  cursor: pointer;
`;
const EAvatar = styled(Avatar)`
  margin-bottom: 1rem;
`;
const EButton = styled(Button)`
  width: 8rem;
  height: 2rem;
  & + & {
    margin-top: 0.5rem;
  }
`;
const EInput = styled(Input)`
  width: auto;
`;

export default Setting;
