import React, { useState } from "react";
import Moon from "./assets/svg/icon-moon.svg";
import Sun from "./assets/svg/icon-sun.svg";
import Avatar from "./assets/img/image-avatar.jpeg";
import { FaExternalLinkAlt, FaGithub, FaGithubAlt } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import { Link } from "react-router-dom";

export const Header = ({ handleMode, setShowProfile, showProfile }) => {
  const [switchModeImg, setSwitchModeImg] = useState(false);
  return (
    <header>
      <Link to="/" className="logo-wrapper">
        <div>
          <h1>i</h1>
        </div>
      </Link>
      <img
        src={localStorage.getItem("toggle") === "enabled" ? Sun : Moon}
        alt="moon"
        className="toggleMode"
        onClick={() => {
          handleMode();
          document.body.classList.contains("dark-mode")
            ? localStorage.setItem("toggle", "enabled")
            : localStorage.setItem("toggle", "disabled");
          setSwitchModeImg(!switchModeImg);
        }}
      />
      <img
        src={Avatar}
        alt="avatar"
        className="avatar"
        onClick={() => setShowProfile(!showProfile)}
      />
      {/* profile start */}
      <div
        className={
          showProfile ? "profile-container show-profile" : "profile-container"
        }
        onClick={() => setShowProfile(!showProfile)}
      >
        <div className="profile-wrapper">
          <img src={Avatar} alt="avatar" className="avatar profile-avatar" />
          <h1>Efe Samuel</h1>
          <p>
            <GoPrimitiveDot />
          </p>
          <p>
            <a
              href="https://efesamuel.netlify.app/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Visit my portfolio <FaExternalLinkAlt />
            </a>
          </p>
          <p>
            <a
              href="https://github.com/efethegenius/invoice-app"
              target="_blank"
              rel="noreferrer noopener"
            >
              Visit Github Repo of this project <FaExternalLinkAlt />
            </a>
          </p>
        </div>
      </div>
      {/* profile end */}
    </header>
  );
};
