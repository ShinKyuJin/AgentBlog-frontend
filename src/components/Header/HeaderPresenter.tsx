import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchIcon from "../../assets/search_icon.png";
import LogoImg from "../../assets/logo.png";
import Modal from "../../modal/Modal";
import AuthContainer from "../../modal/Auth";
import { toast } from "react-toastify";

interface HeaderPresenterProps {
  modalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const HeaderPresenter: React.FC<HeaderPresenterProps> = ({
  modalVisible,
  openModal,
  closeModal,
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
        <button onClick={openModal}>Login</button>
        <LoginContainer to="/auth">auth</LoginContainer>
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 90px;
  padding: 15px;
  padding-bottom: 0;
`;

const SemiContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoContainer = styled(Link)`
  height: 90px;
`;
const SearchContainer = styled(Link)`
  align-self: center;
  padding: 0 15px;
`;

const LoginContainer = styled(Link)`
  align-self: center;
  color: white;
  background-color: black;
  text-decoration: none;
`;

export default HeaderPresenter;
