import React from "react";
import { FaHome } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdLogin, MdRestaurant } from "react-icons/md";

import "../../styles/header.scss";

function Header() {
  return (
    <div className="header-main-container">
      <div className="log-container">
        <img src={require("../../assets/logo.png")} alt="logo" />
      </div>
      <div>
        <ul>
          <li>
            <FaHome size={20} color="black" />
            <span>Home</span>
          </li>
          <li>
            <MdRestaurant size={20} color="black" />
            <span>Create facility</span>
          </li>
          <li>
            <IoMdCall size={20} color="black" />
            <span>Contact Us</span>
          </li>
          <li>
            <MdLogin size={20} color="black" />
            <span>login</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
