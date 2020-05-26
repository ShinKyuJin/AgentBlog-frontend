import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchIcon from "../../assets/search_icon.png";
import LogoImg from "../../assets/logo.png";
import Modal from "../../modal/Modal";

interface HeaderPresenterProps {
  isSearching: boolean;
  setIsSearching: any;
  modalVisible: boolean;
  setModalVisible: any;
  openModal: any;
  closeModal: any;
}

const HeaderPresenter: React.FC<HeaderPresenterProps> = ({
  isSearching,
  setIsSearching,
  modalVisible,
  setModalVisible,
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
        <AuthContainer to="/auth">auth</AuthContainer>
      </SemiContainer>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={false}
          onClose={closeModal}
        >
          Hello
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

const AuthContainer = styled(Link)`
  align-self: center;
  color: white;
  background-color: black;
  text-decoration: none;
`;

export default HeaderPresenter;
