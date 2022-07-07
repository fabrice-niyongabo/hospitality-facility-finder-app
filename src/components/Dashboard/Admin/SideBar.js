import React from "react";
import { FaBed, FaHome, FaRegUserCircle } from "react-icons/fa";
import { GrSettingsOption, GrUserSettings } from "react-icons/gr";
import {
  RiLogoutCircleLine,
  RiSettingsLine,
  RiSecurePaymentLine,
  RiAccountCircleLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SideBar({ activate }) {
  const { fullName } = useSelector((state) => state.user);

  const activateMe = (cls) => (activate === cls ? "active2" : "");

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
              <span>Admin user</span>
            </div>
          </div>
        </div>
      </div>
      <ul>
        <Link to="/dashboard">
          <li className={activateMe("dashboard")}>
            <RiSettingsLine color="#f46a06" size={25} />
            <span>Manage Hotels</span>
          </li>
        </Link>
        <Link to="/managebranches">
          <li className={activateMe("managebranches")}>
            <RiSettingsLine color="#f46a06" size={25} />
            <span>Hotel Branches</span>
          </li>
        </Link>
        <Link to="/managerestaurants">
          <li className={activateMe("managerestaurants")}>
            <RiSettingsLine color="#f46a06" size={25} />
            <span>Manage Restaurants</span>
          </li>
        </Link>
        <Link to="/managecoffeeshops">
          <li className={activateMe("managecoffeeshops")}>
            <RiSettingsLine color="#f46a06" size={25} />
            <span>Manage Coffee shops</span>
          </li>
        </Link>
        <Link to="/managetransport">
          <li className={activateMe("managetransport")}>
            <RiSettingsLine color="#f46a06" size={25} />
            <span>Manage Transport</span>
          </li>
        </Link>
        <Link to="/payments">
          <li className={activateMe("payments")}>
            <RiSecurePaymentLine color="#f46a06" size={25} />
            <span>Payments</span>
          </li>
        </Link>
        <Link to="/account">
          <li className={activateMe("account")}>
            <RiAccountCircleLine color="#f46a06" size={25} />
            <span>Account</span>
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
