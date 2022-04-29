import React from "react";
import { FaHome } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdLogin, MdOutlineDashboard } from "react-icons/md";
import { RiEditCircleLine, RiLogoutCircleLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../../styles/header.scss";

function Header() {
  const { token, fullName } = useSelector((state) => state.user);
  return (
    <div className="header-main-container">
      <div className="log-container">
        <img src={require("../../assets/logo.png")} alt="logo" />
      </div>
      <div>
        <ul>
          <li>
            <Link to="/">
              <FaHome size={20} color="black" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <IoMdCall size={20} color="black" />
              <span>Contact Us</span>
            </Link>
          </li>
          {token && token !== "" && fullName !== "" ? (
            <>
              <li>
                <Link to="/dashboard">
                  <MdOutlineDashboard size={20} color="black" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/logout">
                  <RiLogoutCircleLine size={20} color="black" />
                  <span>Logout</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">
                  <RiEditCircleLine size={20} color="black" />
                  <span>Signup</span>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <MdLogin size={20} color="black" />
                  <span>Login</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
