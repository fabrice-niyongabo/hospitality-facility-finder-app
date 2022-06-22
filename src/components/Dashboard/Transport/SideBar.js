import React from "react";
import { FaRegUserCircle, FaUserCog, FaClipboardList } from "react-icons/fa";
import { RiFileListLine, RiLogoutCircleLine } from "react-icons/ri";
import { SiGoogleanalytics } from "react-icons/si";
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
              <span>Transport Manager</span>
            </div>
          </div>
        </div>
      </div>
      <ul>
        <Link to="/dashboard">
          <li className={activateMe("dashboard")}>
            <RiFileListLine color="#f46a06" size={25} />
            <span>Dashboard</span>
          </li>
        </Link>
        <Link to="/drivers">
          <li className={activateMe("drivers")}>
            <RiFileListLine color="#f46a06" size={25} />
            <span>Drivers List</span>
          </li>
        </Link>
        <Link to="/managecustomers">
          <li className={activateMe("managecustomers")}>
            <RiFileListLine color="#f46a06" size={25} />
            <span>Manage customers</span>
          </li>
        </Link>
        <Link to="/paymentreport">
          <li className={activateMe("paymentreport")}>
            <FaClipboardList color="#f46a06" size={25} />
            <span>Payment reports</span>
          </li>
        </Link>
        <Link to="/analytics">
          <li className={activateMe("analytics")}>
            <SiGoogleanalytics color="#f46a06" size={25} />
            <span>Analytics</span>
          </li>
        </Link>
        <Link to="/account">
          <li className={activateMe("account")}>
            <FaUserCog color="#f46a06" size={25} />
            <span>My account</span>
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
