import React, { useEffect } from "react";
import { FaBars, FaBed, FaHome, FaMoneyCheck, FaUsers } from "react-icons/fa";
import { BsCheckCircleFill, BsPatchQuestionFill } from "react-icons/bs";
import { MdOutlinePendingActions, MdPending } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";
import { useLoadBasicData } from "../../../helpers";
import { Link } from "react-router-dom";

function Hotel() {
  const loadBasics = useLoadBasicData();
  const userObj = useSelector((state) => state.user);
  useEffect(() => {
    loadBasics();
  }, []);
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
              <div className="col-md-3 py-4 br-right">
                <div className="hotel-service">
                  <FaBed color="#f46a06" size={30} />
                  <h2>32</h2>
                  <span>Total Rooms</span>
                </div>
              </div>
              <div className="col-md-3 py-4 br-right">
                <div className="hotel-service">
                  <FaBed color="#f46a06" size={30} />
                  <h2>32</h2>
                  <span>Room Types</span>
                </div>
              </div>
              <div className="col-md-3 py-4 br-right">
                <div className="hotel-service">
                  <FaUsers color="#f46a06" size={30} />
                  <h2>32</h2>
                  <span>Reservations</span>
                </div>
              </div>
              <div className="col-md-3 py-4">
                <div className="hotel-service">
                  <BsPatchQuestionFill color="#f46a06" size={30} />
                  <h2>32</h2>
                  <span>Complaints</span>
                </div>
              </div>
            </div>

            <div className="br my-4"></div>

            <div className="row">
              <div className="col-md-3 py-4 br-right">
                <div className="hotel-service">
                  <FaBars color="#f46a06" size={30} />
                  <h2>32</h2>
                  <span>Booked Rooms</span>
                </div>
              </div>
              <div className="col-md-3 py-4 br-right">
                <div className="hotel-service">
                  <MdPending color="#f46a06" size={30} />
                  <h2>32</h2>
                  <span>Available Rooms</span>
                </div>
              </div>
              <div className="col-md-3 py-4 br-right">
                <div className="hotel-service">
                  <BsCheckCircleFill color="#f46a06" size={30} />
                  <h2>32</h2>
                  <span>Total checked in</span>
                </div>
              </div>
              <div className="col-md-3 py-4">
                <div className="hotel-service">
                  <MdOutlinePendingActions color="#f46a06" size={30} />
                  <h2>32</h2>
                  <span>Pending payments</span>
                </div>
              </div>
            </div>

            <div className="br my-4"></div>

            <div className="row">
              <div className="col-md-6 py-4 br-right">
                <div className="hotel-service">
                  <FaMoneyCheck color="#f46a06" size={30} />
                  <h2>RWF 15000 / 150 USD</h2>
                  <span>Total earning</span>
                </div>
              </div>
              <div className="col-md-6 py-4">
                <div className="hotel-service">
                  <GiReceiveMoney color="#f46a06" size={30} />
                  <h2>0 RWF / 0 USD</h2>
                  <span>Pending payment</span>
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
