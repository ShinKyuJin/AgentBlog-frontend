import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import FatText from "../components/FatText";
import DetailText from "../components/DetailText";
import Input from "../components/Input";

const Setting = () => {
  const [isProfileEditing, SetIsProfileEditing] = useState<boolean>(false);

  return (
    <Container>
      <Profile>
        <ImageEditContainer>
          <Button text={"이미지 업로드"} />
          <Button text={"이미지 제거"} />
        </ImageEditContainer>

        <ProfileTextContainer>
          {!isProfileEditing ? (
            <>
              <FatText text={"이름"} />
              <FatText text={"한 줄 소개"} />
              <EditButton>수정</EditButton>
            </>
          ) : (
            <>
              <Input placeholder={"이름"} />
              <Input placeholder={"한 줄 소개"} />
              <EditButton>저장</EditButton>
            </>
          )}
        </ProfileTextContainer>
      </Profile>
      <SettingWrapper>
        <RowContainer>
          <SettingLabel>
            <FatText text={"블로그 제목"} />
          </SettingLabel>
          <SettingText>react.log</SettingText>
        </RowContainer>
        <SettingDetail>
          <DetailText
            text={"개인 페이지의 좌측 상단에 나타나는 페이지 제목입니다."}
          />
        </SettingDetail>
        <hr />
      </SettingWrapper>
    </Container>
  );
};

const Container = styled.div`
  ${(prop) => prop.theme.responsiveContainer}
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 2rem;
`;
const Profile = styled.div``;
const SettingWrapper = styled.div``;
const RowContainer = styled.div``;
const SettingLabel = styled.div``;
const SettingText = styled.div``;
const SettingDetail = styled.div``;
const ImageEditContainer = styled.div``;
const ProfileTextContainer = styled.div``;
const EditButton = styled.span``;

export default Setting;
