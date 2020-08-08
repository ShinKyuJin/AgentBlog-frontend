import React, { useState, useEffect } from "react";

import HeaderPresenter from "./HeaderPresenter";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { LOG_OUT } from "../../../modal/Auth/AuthQueries";
import { useMutation } from "react-apollo-hooks";
import { MeProps } from "../../../models/user";

interface HeaderContainerProps {
  isLoggedIn: boolean;
}

const HeaderContainer = ({ isLoggedIn }: HeaderContainerProps) => {
  const me = useSelector((state: RootState) => state.me) as MeProps;
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [path, setPath] = useState(window.location.pathname);
  const [isDropdown, setIsDropdown] = useState(false);
  const [localLogOutMutation] = useMutation(LOG_OUT);

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      //console.log(location.pathname);
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
          isDropdown={isDropdown}
          setIsDropdown={setIsDropdown}
          me={me}
          localLogOutMutation={localLogOutMutation}
        />
      )}
    </>
  );
};

export default React.memo(HeaderContainer, (currProps, nextProps) => {
  return currProps.isLoggedIn !== nextProps.isLoggedIn;
});
