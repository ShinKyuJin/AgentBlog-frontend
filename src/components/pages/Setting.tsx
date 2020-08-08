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

  const [avatar, setAvatar] = useInput(me.avatar);
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
      // TODO: Remove Image from S3 Server
      // const { data: avatar } = await Axios.post(
      //   serverUri + "/api/upload",
      //   formData,
      //   {
      //     headers: {
      //       "content-type": "multipart/form-data",
      //     },
      //   }
      // );
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
      console.log(err);
    }
    setIsNameBioSaving(false);
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
