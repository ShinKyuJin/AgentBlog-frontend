import React, { useState } from "react";

import HeaderPresenter from "./HeaderPresenter";

const HeaderContainer = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <HeaderPresenter
      isSearching={isSearching}
      setIsSearching={setIsSearching}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};

export default HeaderContainer;
