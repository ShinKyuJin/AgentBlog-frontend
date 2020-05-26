import React, { useState } from "react";

import HeaderPresenter from "./HeaderPresenter";

interface HeaderContainerProps {
  isLoggedIn: boolean;
}

const HeaderContainer = ({ isLoggedIn }: HeaderContainerProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <HeaderPresenter
      modalVisible={modalVisible}
      openModal={openModal}
      closeModal={closeModal}
      isLoggedIn={isLoggedIn}
    />
  );
};

export default HeaderContainer;
