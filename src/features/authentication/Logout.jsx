import React from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

const Logout = () => {
  const [isLoading, logoutUser] = useLogout();
  const logoutHandler = () => {
    logoutUser();
  };
  return (
    <ButtonIcon onClick={logoutHandler} disabled={isLoading}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
};

export default Logout;
