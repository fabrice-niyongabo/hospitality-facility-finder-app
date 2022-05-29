import React, { useEffect, useState } from "react";
import { FaEye, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";
import Axios from "axios";
import AddRestaurantItem from "../Modals/AddRestaurantItem";
import Loader from "../Modals/Loader";
import { handleAuthError } from "../../../helpers";
import { Link } from "react-router-dom";

function OrderList() {
  const userObj = useSelector((state) => state.user);
  const [ordersList, setOrdersList] = useState(["dddd"]);
  return (
    <div className="body">
      <div className="dashoard-main-container">
        <div className="sidebar">
          <SideBar activate="orderlist" />
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
              <div className="mb-3">
                <button
                  style={{ padding: "5px 15px", borderRadius: 5 }}
                  className="orange-border bg-white"
                >
                  ALL ORDERS
                </button>
                &nbsp;
                <button
                  style={{ padding: "5px 15px", borderRadius: 5 }}
                  className="orange-border bg-white"
                >
                  NEW ORDERS
                </button>
                &nbsp;
                <button
                  style={{ padding: "5px 15px", borderRadius: 5 }}
                  className="orange-border bg-white"
                >
                  ON PREGRESS
                </button>
                &nbsp;
                <button
                  style={{ padding: "5px 15px", borderRadius: 5 }}
                  className="orange-border bg-white"
                >
                  CANCELLED ORDERS
                </button>
                &nbsp;
                <button
                  style={{ padding: "5px 15px", borderRadius: 5 }}
                  className="orange-border bg-white"
                >
                  COMPLETED ORDERS
                </button>
              </div>
              {ordersList.length > 0 ? (
                <>
                  <table className="w-100">
                    <thead className="bg-light-orange">
                      <th className="p-2">Order ID</th>
                      <th className="p-2">Pickup Time</th>
                      <th className="p-2">Pickup Date</th>
                      <th className="p-2">Customer Name</th>
                      <th className="p-2">Payment Status</th>
                      <th></th>
                    </thead>
                    <tbody>
                      <tr className="border-bottom">
                        <td className="p-2">#1</td>
                        <td className="p-2">08:12</td>
                        <td className="p-2">14/05/2020</td>
                        <td className="p-2">User names</td>
                        <td className="p-2 text-orange">Pending</td>
                      </tr>
                      <tr className="border-bottom">
                        <td className="p-2">#2</td>
                        <td className="p-2">08:12</td>
                        <td className="p-2">14/05/2020</td>
                        <td className="p-2">User names</td>
                        <td className="p-2 text-orange">Cancelled</td>
                      </tr>
                    </tbody>
                  </table>
                </>
              ) : (
                <p>No orders found</p>
              )}
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

export default OrderList;
