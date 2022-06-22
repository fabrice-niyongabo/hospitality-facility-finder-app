import React, { useEffect, useState } from "react";
import { FaEye, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "../Hotel/SideBar";
import Axios from "axios";
import Loader from "../Modals/Loader";
import { errorHandler } from "../../../helpers";
import Chart from "../Restaurant/Chart";
import { Link } from "react-router-dom";

function Hotel() {
  const userObj = useSelector((state) => state.user);
  const [showLoader, setShowLoader] = useState(true);
  const [results, setRestults] = useState([]);
  useEffect(() => {
    Axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/analytics/find/room?token=" +
        userObj.token
    )
      .then((res) => {
        console.log(res.data);
        setShowLoader(false);
        setRestults(res.data.results);
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  }, []);
  return (
    <div className="body">
      <div className="dashoard-main-container">
        <div className="sidebar">
          <SideBar activate="analytics" />
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
          <div className="main-contents-container" style={{ padding: "1rem" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: 10,
              }}
            >
              {results.map((item, index) => (
                <div key={index} className={results.length > 0 ? "mb-3" : ""}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className="bg-orange"
                      style={{ width: 10, borderRadius: 10, height: 70 }}
                    ></div>
                    <div className="w-100" style={{ marginLeft: 15 }}>
                      <h2 className="mb-0 quicksand-font">
                        Price analytics for {item.item.roomNumber}
                      </h2>
                      <p className="text-gray">{item.item.description}</p>
                    </div>
                  </div>
                  <Chart data={item.data} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Loader showLoader={showLoader} />
    </div>
  );
}

export default Hotel;
