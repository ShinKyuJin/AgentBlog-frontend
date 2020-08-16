import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoImg from "../../../assets/logo.png";
import IconLogoImg from "../../../assets/small_logo.png";
import Modal from "../../../modal/Modal";
import AuthContainer from "../../../modal/Auth";
import Button from "../../atoms/theme/Button";
import { Icon } from "../../atoms/theme/Icon";
import Avatar from "../../atoms/user/Avatar";
import Dropdown from "./Dropdown";
import { MeProps } from "../../../models/user";

interface HeaderPresenterProps {
  blogname: string | undefined;
  modalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  isLoggedIn: boolean;
  isDropdown: boolean;
  setIsDropdown: any;
  me: MeProps;
  localLogOutMutation: any;
}

const HeaderPresenter: React.FC<HeaderPresenterProps> = ({
  blogname,
  modalVisible,
  openModal,
  closeModal,
  isLoggedIn,
  isDropdown,
  setIsDropdown,
  me,
  localLogOutMutation,
}) => {
  useEffect(() => {
    const handleOnClick = () => setIsDropdown(false);
    document.addEventListener("click", handleOnClick, true);
    return () => {
      document.removeEventListener("click", handleOnClick, true);
    };
  }, []);

  return (
    <Container>
      {!blogname ? (
        <LogoContainer to="/">
          <Logo src={LogoImg} alt="logo" />
        </LogoContainer>
      ) : (
        <IconContainer>
          <LogoContainer to="/">
            <IconLogo src={IconLogoImg} alt="logo" />
          </LogoContainer>
          <BlogLink to={`/@${blogname}`}>{blogname}</BlogLink>
        </IconContainer>
      )}

      <SemiContainer>
        <SearchContainer to="/search">
          <Icon type={"search"} size={20} />
        </SearchContainer>
        {isLoggedIn ? (
          <>
            <EWriteLink to="/write">새 글 작성</EWriteLink>
            <DropdownController onClick={() => setIsDropdown(true)}>
              <EAvatar size={"md"} url={me.avatar} />
              <DropdownIconContainer>
                <Icon type={"down"} size={9} />
              </DropdownIconContainer>
            </DropdownController>
            <Dropdown
              items={[
                { name: `내 블로그`, to: `/@${me.username}` },
                { name: "설정", to: "/setting" },
                {
                  name: "로그아웃",
                  to: "",
                  callback: localLogOutMutation,
                },
              ]}
              isVisible={
                isDropdown && me.username !== "" && me.username !== undefined
              }
            />
          </>
        ) : (
          <EButton text={"로그인"} onClick={openModal} />
        )}
      </SemiContainer>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={false}
          onClose={closeModal}
        >
          <AuthContainer closeModal={closeModal} />
        </Modal>
      )}
    </Container>
  );
};

const Container = styled.header`
  ${(prop) => prop.theme.responsiveContainer}
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding-bottom: 0;
`;

const SemiContainer = styled.nav`
  display: flex;
`;

const LogoContainer = styled(Link)``;

const Logo = styled.img``;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconLogo = styled.img`
  width: 28px;
  height: 28px;
`;

const BlogLink = styled(Link)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: hidden;
  font-size: 1.3125rem;
  font-weight: bold;
  color: rgb(52, 58, 64);
  font-family: "Fira Mono", monospace;
  margin-left: 1rem;
`;

const SearchContainer = styled(Link)`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  background-color: inherit;
  width: 37px;
  height: 37px;
  border-radius: 10rem;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;

const EButton = styled(Button)`
  width: auto;
  height: 2rem;
  padding: 0px 15px;
  align-self: center;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 30px;
  background-color: ${(props) => props.theme.deepDarkGreyColor};
  text-decoration: none;

  transition: background-color 0.08s ease-out 0s;
  &:hover {
    background-color: ${(props) => props.theme.greyColor};
  }
`;

const EWriteLink = styled(Link)`
  @media (max-width: 1024px) {
    display: none;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 2rem;
  padding: 0px 15px;
  align-self: center;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 30px;
  background-color: ${(props) => props.theme.deepDarkGreyColor};
  text-decoration: none;

  transition: background-color 0.08s ease-out 0s;
  &:hover {
    background-color: ${(props) => props.theme.greyColor};
  }
`;

const DropdownController = styled.div`
  display: flex;
  cursor: pointer;
`;

const EAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-left: 0.5rem;
`;

const DropdownIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 40px;
`;

export default HeaderPresenter;
