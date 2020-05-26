import React, { useState } from "react";

import HeaderPresenter from "./HeaderPresenter";

const HeaderContainer = () => {
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
    />
  );
};

export default HeaderContainer;
