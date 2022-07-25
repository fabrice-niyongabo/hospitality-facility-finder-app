import React, { useEffect, useState } from "react";
import { FaBars, FaBed, FaHome, FaMoneyCheck, FaUsers } from "react-icons/fa";
import { BsCheckCircleFill, BsPatchQuestionFill } from "react-icons/bs";
import { MdOutlinePendingActions, MdPending } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";
import { errorHandler, useLoadBasicData } from "../../../helpers";
import { Link } from "react-router-dom";
import { fetchRooms } from "../../../actions/facility";
import Axios from "axios";
function Hotel() {
  const loadBasics = useLoadBasicData();
  const dispatch = useDispatch();
  const userObj = useSelector((state) => state.user);
  const { allRooms } = useSelector((state) => state.facility).rooms;
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    loadBasics();
    dispatch(fetchRooms());
    Axios.get(
      process.env.REACT_APP_BACKEND_URL + "/booking/all/?token=" + userObj.token
    )
      .then((res) => {
        console.log(res.data);
        setBooking(res.data.result);
      })
      .catch((error) => {
        errorHandler(error);
      });
  }, []);

  const getTotalRoomTypes = () => {
    const types = [];
    for (let i = 0; i < allRooms.length; i++) {
      if (!types.includes(allRooms[i].type)) {
        types.push(allRooms[i].type);
      }
    }
    return types.length;
  };
  const getAvailableRooms = () => {
    const avail = [];
    const bookedRooms = booking.filter((item) => item.paymentStatus === "paid");
    for (let i = 0; i < allRooms.length; i++) {
      for (let j = 0; j < bookedRooms.length; j++) {
        if (allRooms[i]._id === bookedRooms[j].roomId) {
          avail.push(allRooms[i].roomNumber);
          break;
        }
      }
    }
    return avail.length;
  };
  return (
    <div className="body">
      <div className="dashoard-main-container">
        <div className="sidebar">
          <SideBar activate="dashboard" />
        </div>
        <div className="contents">
          <div className="contents-header">
            <div className="title">
              <FaHome color="black" size={30} />
              <Link to="/">
                <span>Back To Home Page</span>
              </Link>
            </div>
            <div className="company">{userObj.companyName}</div>
          </div>
          <div className="main-contents-container">
            <div className="row">
              <div className="col-md-4 py-4 br-right">
                <div className="hotel-service">
                  <FaBed color="#f46a06" size={30} />
                  <h2>{allRooms.length}</h2>
                  <span>Total Rooms</span>
                </div>
              </div>
              <div className="col-md-4 py-4 br-right">
                <div className="hotel-service">
                  <FaBed color="#f46a06" size={30} />
                  <h2>{getTotalRoomTypes()}</h2>
                  <span>Room Types</span>
                </div>
              </div>
              <div className="col-md-4 py-4">
                <div className="hotel-service">
                  <a href="branches">
                    <button className="btn bg-orange text-white">
                      Switch Branches
                    </button>
                  </a>
                </div>
              </div>
            </div>

            <div className="br my-4"></div>

            <div className="row">
              <div className="col-md-4 py-4 br-right">
                <div className="hotel-service">
                  <FaBars color="#f46a06" size={30} />
                  <h2>
                    {
                      booking.filter((item) => item.paymentStatus === "paid")
                        .length
                    }
                  </h2>
                  <span>Booked Rooms</span>
                </div>
              </div>
              <div className="col-md-4 py-4 br-right">
                <div className="hotel-service">
                  <MdPending color="#f46a06" size={30} />
                  <h2>{getAvailableRooms()}</h2>
                  <span>Available Rooms</span>
                </div>
              </div>
              <div className="col-md-4 py-4">
                <div className="hotel-service">
                  <MdOutlinePendingActions color="#f46a06" size={30} />
                  <h2>
                    {
                      booking.filter((item) => item.paymentStatus === "failed")
                        .length
                    }
                  </h2>
                  <span>Canceled payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotel;
