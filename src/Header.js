import React from "react";
import Logo from "./assets/svg/logo.svg";
import Moon from "./assets/svg/icon-moon.svg";
import Sun from "./assets/svg/icon-sun.svg";
import Avatar from "./assets/img/image-avatar.jpg";

export const Header = ({ handleMode, toggleMode, setToggleMode }) => {
  return (
    <header>
      <div className="logo-wrapper">
        <img src={Logo} alt="" />
      </div>
      <img
        src={toggleMode ? Sun : Moon}
        alt="moon"
        className="toggleMode"
        onClick={handleMode}
      />
      <img src={Avatar} alt="avatar" className="avatar" />
    </header>
  );
};
