import React from "react";
import { FaBed, FaHome, FaRegUserCircle } from "react-icons/fa";
import { SiHotelsdotcom } from "react-icons/si";
import { GrSettingsOption, GrUserSettings } from "react-icons/gr";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SideBar({ activate }) {
  const { fullName } = useSelector((state) => state.user);

  const activateMe = (cls) => (activate === cls ? "active" : "");

  return (
    <div className="main-contents">
      <div className="user-main-container">
        <div className="rw">
          <div className="icon">
            <FaRegUserCircle color="black" size={50} />
          </div>
          <div className="details">
            <h2>{fullName}</h2>
            <div className="title">
              <div></div>
              <span>Hotel Manager</span>
            </div>
          </div>
        </div>
      </div>
      <ul>
        <Link to="/dashboard">
          <li className={activateMe("dashboard")}>
            <MdDashboard color="#f46a06" size={25} />
            <span>Dashboard</span>
          </li>
        </Link>
        <Link to="/description">
          <li className={activateMe("description")}>
            <SiHotelsdotcom color="#f46a06" size={25} />
            <span>Hotel Description</span>
          </li>
        </Link>
        <Link to="/managerooms">
          <li className={activateMe("managerooms")}>
            <FaBed color="#f46a06" size={25} />
            <span>Manage Rooms</span>
          </li>
        </Link>
        <Link to="/manageservices">
          <li className={activateMe("manageservices")}>
            <GrSettingsOption colorProfile="#f46a06" size={25} />
            <span>Manage Services</span>
          </li>
        </Link>
        <Link to="/account">
          <li className={activateMe("account")}>
            <GrUserSettings color="#f46a06" size={25} />
            <span>My account</span>
          </li>
        </Link>
        <Link to="/">
          <li>
            <FaHome color="#f46a06" size={25} />
            <span>Home page</span>
          </li>
        </Link>
        <Link to="/logout">
          <li>
            <RiLogoutCircleLine color="#f46a06" size={25} />
            <span>Logout</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default SideBar;
