import React, { useState, useEffect } from "react";

import HeaderPresenter from "./HeaderPresenter";
import { useHistory } from "react-router-dom";

interface HeaderContainerProps {
  isLoggedIn: boolean;
}

const HeaderContainer = ({ isLoggedIn }: HeaderContainerProps) => {
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      console.log(location.pathname);
      setPath(location.pathname);
    });
    return () => unlisten();
  });

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {path !== "/write" && (
        <HeaderPresenter
          modalVisible={modalVisible}
          openModal={openModal}
          closeModal={closeModal}
          isLoggedIn={isLoggedIn}
        />
      )}
    </>
  );
};

export default HeaderContainer;
