import React, { useState, useEffect } from "react";

import HeaderPresenter from "./HeaderPresenter";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { LOG_OUT } from "../modal/Auth/AuthQueries";
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
  const path_ = path.split("/")[1];
  let blogname = path_.charAt(0) === "@" ? path_.slice(1) : undefined;

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      // TODO blogname
      //const path = location.pathname.split("/")[1];
      setPath(location.pathname);
    });
    return () => unlisten();
  });

  useEffect(() => {
    const handleOnClick = () => setIsDropdown(false);
    document.addEventListener("click", handleOnClick, true);
    return () => {
      document.removeEventListener("click", handleOnClick, true);
    };
  }, [setIsDropdown]);

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
          blogname={blogname}
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
