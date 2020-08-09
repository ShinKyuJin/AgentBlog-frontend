import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Button from "../atoms/theme/Button";
import FatText from "../atoms/theme/FatText";
import DetailText from "../atoms/theme/DetailText";
import Input from "../atoms/theme/Input";
import Avatar from "../atoms/user/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { toast } from "react-toastify";
import { useMutation } from "react-apollo-hooks";
import { QUERY_EDIT_USER, MeProps } from "../../models/user";
import { me_set } from "../../store/modules/me";
import useInput from "../../hooks/useInput";
import Axios from "axios";
import { serverUri } from "../../Apollo/Client";

const Setting = () => {
  const me = useSelector((state: RootState) => state.me);
  const [isNameBioEditing, setIsNameBioEditing] = useState<boolean>(false);
  const [isNameBioSaving, setIsNameBioSaving] = useState<boolean>(false);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [isBlognameEditing, setIsBlognameEditing] = useState<boolean>(false);
  const [isBlognameSaving, setIsBlognameSaving] = useState<boolean>(false);

  const [username, setUsername] = useInput(me.username);
  const [bio, setBio] = useInput(me.bio);
  const [blogname, setBlogname] = useInput(me.blogname);

  const disfetch = useDispatch();
  const [editUserMutation] = useMutation(QUERY_EDIT_USER);

  const handleUploadAvatar = useCallback(async (e: any) => {
    const file = e.target.files[0];
    setIsImageUploading(true);
    const formData = new FormData();
    formData.append("file", file, file.originalname);
    try {
      const { data: avatar } = await Axios.post(
        serverUri + "/api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      const { data }: any = await editUserMutation({
        variables: { avatar: avatar.location },
      });
      disfetch(me_set(data.editUser as MeProps));
    } catch (err) {
      toast.error("파일 업로드에 실패하였습니다." + err);
      return null;
    }
    setIsImageUploading(false);
  }, []);

  const handleRemoveAvatar = useCallback(async (e: any) => {
    try {
      // TODO - Remove Image from S3 Server
      const { data }: any = await editUserMutation({
        variables: { avatar: "" },
      });
      disfetch(me_set(data.editUser as MeProps));
    } catch (err) {
      toast.error("이미지 제거에 실패했습니다." + err);
      return null;
    }
  }, []);

  const handleEditNameBio = () => {
    setUsername(me.username);
    setBio(me.bio);
    setIsNameBioEditing(true);
  };

  const handleSaveNameBio = async () => {
    if (username.value === "") {
      toast.error("이름을 비울 수 없습니다.");
      return;
    }
    try {
      setIsNameBioSaving(true);
      const { data }: any = await editUserMutation({
        variables: {
          username: username.value,
          bio: bio.value,
        },
      });
      disfetch(me_set(data.editUser as MeProps));
      setIsNameBioEditing(false);
    } catch (err) {
      toast.error("변경 내용 저장 중 에러가 발생했습니다.");
    }
    setIsNameBioSaving(false);
  };

  const handleEditBlogname = () => {
    setBlogname(me.blogname);
    setIsBlognameEditing(true);
  };

  const handleSaveBlogname = async () => {
    if (blogname.value === "") {
      toast.error("블로그 이름을 비울 수 없습니다.");
      return;
    }
    try {
      setIsBlognameSaving(true);
      const { data }: any = await editUserMutation({
        variables: {
          blogname: blogname.value,
        },
      });
      disfetch(me_set(data.editUser as MeProps));
      setIsBlognameEditing(false);
    } catch (err) {
      toast.error("변경 내용 저장 중 에러가 발생했습니다.");
      console.log(err);
    }
    setIsBlognameSaving(false);
  };

  return (
    <Container>
      <Profile>
        <ImageEditContainer>
          <EAvatar size={"lg"} url={me.avatar} />
          <EButton
            text={"이미지 업로드"}
            disabled={isImageUploading}
            onClick={() => document.getElementById("fileid")?.click()}
          />
          <input
            id={"fileid"}
            type={"file"}
            accept={"image/*"}
            onChange={handleUploadAvatar}
            hidden
          />
          <EButton
            text={"이미지 제거"}
            onClick={handleRemoveAvatar}
            style={{ color: "rgb(18, 184, 134)", background: "none" }}
          />
        </ImageEditContainer>

        <ProfileTextContainer>
          {!isNameBioEditing ? (
            <>
              <h1 style={{ margin: "0.5rem 0 0 0" }}>{me.username}</h1>
              <DetailText text={me.bio} />
              <EditButton onClick={handleEditNameBio}>수정</EditButton>
            </>
          ) : (
            <>
              <EInput
                placeholder={"이름"}
                style={{ fontSize: "1.5rem" }}
                {...username}
              />
              <EInput placeholder={"한 줄 소개"} {...bio} />
              <EButton
                text={"저장"}
                onClick={handleSaveNameBio}
                disabled={isNameBioSaving}
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
              <EH3>블로그 제목</EH3>
            </SettingLabel>
            <SettingContent>
              {!isBlognameEditing ? (
                <>
                  <SettingText>{me.blogname}</SettingText>
                  <EditButton onClick={handleEditBlogname}>수정</EditButton>
                </>
              ) : (
                <>
                  <SettingInput placeholder={"블로그 제목"} {...blogname} />
                  <SettingSaveButton
                    text={"저장"}
                    onClick={handleSaveBlogname}
                    disabled={isBlognameSaving}
                  />
                </>
              )}
            </SettingContent>
          </RowResponsiveContainer>
          <DetailTextContainer>
            <DetailText
              text={"개인 페이지의 좌측 상단에 나타나는 페이지 제목입니다."}
            />
          </DetailTextContainer>
        </SettingRow>
        <SettingRow>
          <RowResponsiveContainer>
            <SettingLabel>
              <EH3>이메일 주소</EH3>
            </SettingLabel>
            <SettingText>react.log</SettingText>
          </RowResponsiveContainer>
          <DetailTextContainer>
            <DetailText
              text={
                "회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다."
              }
            />
          </DetailTextContainer>
        </SettingRow>
        <SettingRow>
          <RowResponsiveContainer>
            <SettingLabel>
              <EH3>회원 탈퇴</EH3>
            </SettingLabel>
            <EButton text={"회원 탈퇴"} buttonStyle={"warning"} />
          </RowResponsiveContainer>
          <DetailTextContainer>
            <DetailText
              text={
                "탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다."
              }
            />
          </DetailTextContainer>
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
const Profile = styled.section`
  @media (max-width: 768px) {
    flex-direction: column;
  }
  flex-direction: row;
  display: flex;
`;
const SettingWrapper = styled.section`
  margin-top: 4rem;
`;
const RowResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
  }
  flex-direction: row;
  display: flex;
`;
const SettingLabel = styled.div`
  width: 10rem;
`;
const SettingContent = styled.div`
  display: flex;
  flex: 1 1 0%;
  align-items: center;
`;
const EH3 = styled.h3`
  margin: 0px;
  line-height: 1.5;
`;
const SettingText = styled.div`
  display: flex;
  flex: 1 1 0%;
  align-items: center;
`;
const SettingRow = styled.div`
  & + & {
    border-top: 1px solid rgb(233, 236, 239);
  }
  padding: 1rem 0px;
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
const SettingSaveButton = styled(Button)`
  width: 5rem;
  height: 2.2rem;
  margin-left: 1rem;
`;
const EInput = styled(Input)`
  width: auto;
`;

const SettingInput = styled(Input)`
  flex: 1 1 0%;
`;

const DetailTextContainer = styled.div`
  margin-top: 1rem;
`;

export default Setting;
