import React from "react";
import {
  FaBars,
  FaBed,
  FaEye,
  FaHome,
  FaMoneyCheck,
  FaPrint,
  FaTrash,
  FaUsers,
} from "react-icons/fa";
import { BsCheckCircleFill, BsPatchQuestionFill } from "react-icons/bs";
import { MdOutlinePendingActions, MdPending } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";

function ManageRooms() {
  const userObj = useSelector((state) => state.user);
  return (
    <div className="body">
      <div className="dashoard-main-container">
        <div className="sidebar">
          <SideBar activate="managerooms" />
        </div>
        <div className="contents">
          <div className="contents-header">
            <div className="title">
              <FaHome color="black" size={30} />
              <span> Hotel Manager Dashboard</span>
            </div>
            <div className="company">{userObj.companyName}</div>
          </div>
          <div className="main-contents-container" style={{ padding: "1rem" }}>
            <div
              style={{
                padding: "1rem",
                borderRadius: 10,
                backgroundColor: "#fff",
              }}
            >
              <div className="manage-room-header">
                <h3>Manage Rooms</h3>
                <div>
                  <button class="btn">Add item</button>
                  &nbsp; &nbsp; &nbsp;
                  <button class="btn">
                    <FaPrint color="white" size={20} /> Print
                  </button>
                </div>
              </div>
              <div className="my-3">
                <input className="form-control" placeholder="Search rooms" />
              </div>
              <div className="room-table">
                <table>
                  <thead>
                    <th>Room No</th>
                    <th>Room Type</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Room No</td>
                      <td>Room Type</td>
                      <td>Price</td>
                      <td>Status</td>
                      <td>Check In</td>
                      <td>Check Out</td>
                      <td>
                        <div class="icons">
                          <div>
                            <FaEye color="black" size={15} />
                          </div>
                          <div>
                            <FaTrash color="black" size={15} />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Room No</td>
                      <td>Room Type</td>
                      <td>Price</td>
                      <td>Status</td>
                      <td>Check In</td>
                      <td>Check Out</td>
                      <td>
                        <div class="icons">
                          <div>
                            <FaEye color="black" size={15} />
                          </div>
                          <div>
                            <FaTrash color="black" size={15} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              style={{
                padding: "1rem",
                borderRadius: 10,
                backgroundColor: "#fff",
                marginTop: "1rem",
              }}
            >
              <div className="manage-rooms-footer">
                <h3>Total payment: 5000 Rwf / 50 USD</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageRooms;
