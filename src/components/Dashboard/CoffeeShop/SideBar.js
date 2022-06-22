import React from "react";
import { FaBed, FaHome, FaRegUserCircle, FaUserCog } from "react-icons/fa";
import { SiGoogleanalytics, SiHotelsdotcom } from "react-icons/si";
import {
  RiFileListLine,
  RiLogoutCircleLine,
  RiSecurePaymentFill,
} from "react-icons/ri";
import { BiRestaurant } from "react-icons/bi";
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
              <span>CoffeeShop Manager</span>
            </div>
          </div>
        </div>
      </div>
      <ul>
        <Link to="/dashboard">
          <li className={activateMe("dashboard")}>
            <RiFileListLine color="#f46a06" size={25} />
            <span>Items List</span>
          </li>
        </Link>
        <Link to="/orderlist">
          <li className={activateMe("orderlist")}>
            <RiFileListLine color="#f46a06" size={25} />
            <span>Order List</span>
          </li>
        </Link>
        <Link to="/description">
          <li className={activateMe("description")}>
            <BiRestaurant color="#f46a06" size={25} />
            <span>CoffeeShop Description</span>
          </li>
        </Link>
        <Link to="/paymentreport">
          <li className={activateMe("paymentreport")}>
            <RiSecurePaymentFill color="#f46a06" size={25} />
            <span>Payment Report</span>
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
