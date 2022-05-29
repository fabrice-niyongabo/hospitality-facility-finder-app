import React, { useEffect, useState } from "react";
import { FaEye, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";
import CoffeSidebar from "../CoffeeShop/SideBar";
import Axios from "axios";
import AddRestaurantItem from "../Modals/AddRestaurantItem";
import Loader from "../Modals/Loader";
import { handleAuthError } from "../../../helpers";
import Chart from "./Chart";
import { GrUser } from "react-icons/gr";
import { Link } from "react-router-dom";

function Analytics() {
  const userObj = useSelector((state) => state.user);
  return (
    <div className="body">
      <div className="dashoard-main-container">
        <div className="sidebar">
          {userObj.role === "restaurant" ? (
            <SideBar activate="analytics" />
          ) : (
            <CoffeSidebar />
          )}
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
              <div className="row">
                <div className="col-md-6">
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
                      <h2 className="mb-0 quicksand-font">Loyal customers</h2>
                      <p className="text-gray">These are our loyal customers</p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div
                      className="my-3"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <GrUser size={50} />
                      </div>
                      <div className="w-100" style={{ paddingLeft: 10 }}>
                        <span>user names</span>
                      </div>
                    </div>
                    <div
                      className="my-3"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <GrUser size={50} />
                      </div>
                      <div className="w-100" style={{ paddingLeft: 10 }}>
                        <span>user names</span>
                      </div>
                    </div>
                    <div
                      className="my-3"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <GrUser size={50} />
                      </div>
                      <div className="w-100" style={{ paddingLeft: 10 }}>
                        <span>user names</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 border-start">
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
                      <h2 className="mb-0 quicksand-font">Loyal customers</h2>
                      <p className="text-gray">These are our loyal customers</p>
                    </div>
                  </div>
                  <Chart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Loader showLoader={showLoader} />
      <AddRestaurantItem
        setShowLoader={setShowLoader}
        showModal={showModal}
        setShowModal={setShowModal}
        itemsList={itemsList}
        setItemsList={setItemsList}
      /> */}
    </div>
  );
}

export default Analytics;
