import React from "react";
import { FaBed, FaRegUserCircle } from "react-icons/fa";
import { SiHotelsdotcom } from "react-icons/si";
import { GrSettingsOption, GrUserSettings } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { useSelector } from "react-redux";

function SideBar() {
  const { fullName } = useSelector((state) => state.user);
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
        <li className="active">
          <MdDashboard color="#f46a06" size={25} />
          <span>Dashboard</span>
        </li>
        <li>
          <SiHotelsdotcom color="#f46a06" size={25} />
          <span>Hotel Description</span>
        </li>
        <li>
          <FaBed color="#f46a06" size={25} />
          <span>Manage Rooms</span>
        </li>
        <li>
          <GrSettingsOption colorProfile="#f46a06" size={25} />
          <span>Manage Services</span>
        </li>
        <li>
          <GrUserSettings color="#f46a06" size={25} />
          <span>My account</span>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
