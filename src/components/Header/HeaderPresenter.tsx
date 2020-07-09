import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoImg from "../../assets/logo.png";
import Modal from "../../modal/Modal";
import AuthContainer from "../../modal/Auth";
import Button from "../Button";
import { Icon } from "../Icon";
import Avatar from "../Avatar";

interface HeaderPresenterProps {
  modalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  isLoggedIn: boolean;
}

const HeaderPresenter: React.FC<HeaderPresenterProps> = ({
  modalVisible,
  openModal,
  closeModal,
  isLoggedIn,
}) => {
  return (
    <Container>
      <LogoContainer to="/">
        <Logo src={LogoImg} alt="logo" />
      </LogoContainer>
      <SemiContainer>
        <SearchContainer to="/search">
          <Icon type={"search"} size={20} />
        </SearchContainer>
        {isLoggedIn ? (
          <>
            <EWriteLink to="/write">새 글 작성</EWriteLink>
            <EAvatar size={"md"} url={""} />
            <DropdownIconContainer>
              <Icon type={"down"} size={9} />
            </DropdownIconContainer>
            <DropdownContainer>
              <DropdownContent>
                <DropdownWrapper>
                  <DropdownItem>내 블로그</DropdownItem>
                  <DropdownItem>hihi</DropdownItem>
                </DropdownWrapper>
              </DropdownContent>
            </DropdownContainer>
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

const DropdownContainer = styled.div`
  position: relative;
`;
const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0px;
  margin-top: 1rem;
`;
const DropdownWrapper = styled.div`
  position: relative;
  width: 12rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
  background: white;
`;
const DropdownItem = styled.div`
  color: rgb(33, 37, 41);
  line-height: 1.5;
  font-weight: 500;
  cursor: pointer;
  padding: 0.75rem 1rem;
  &:hover {
    background: rgb(248, 249, 250);
  }
`;

export default HeaderPresenter;
