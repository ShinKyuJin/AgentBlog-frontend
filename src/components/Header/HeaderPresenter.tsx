import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchIcon from "../../assets/search_icon.png";
import LogoImg from "../../assets/logo.png";
import Modal from "../../modal/Modal";
import AuthContainer from "../../modal/Auth";
import Button from "../Button";

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
        <img src={LogoImg} alt="logo" width="90px" />
      </LogoContainer>
      <SemiContainer>
        <SearchContainer to="/search">
          <img src={SearchIcon} alt="search" width="30px" />
        </SearchContainer>
        {isLoggedIn ? (
          <EWriteLink to="/write">새 글 작성</EWriteLink>
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

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 90px;
  padding-bottom: 0;
`;

const SemiContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoContainer = styled(Link)`
  height: 90px;
  margin-left: 30px;
`;

const SearchContainer = styled(Link)`
  align-self: center;
  padding: 0 15px;
`;

const EButton = styled(Button)`
  align-self: center;
  color: white;
  width: 70px;
  margin-right: 30px;
  border-radius: 30px;
  background-color: black;
  text-decoration: none;
`;

const EWriteLink = styled(Link)`
  align-self: center;
  color: white;
  width: 70px;
  margin-right: 30px;
  border-radius: 30px;
  background-color: black;
  text-decoration: none;

  border: 0px;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  padding: 10px 15px;
`;

export default HeaderPresenter;
