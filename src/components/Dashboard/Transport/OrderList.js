import React, { useEffect, useState } from "react";
import { FaEye, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";
import Axios from "axios";
import AddRestaurantItem from "../Modals/AddRestaurantItem";
import Loader from "../Modals/Loader";
import { errorHandler, handleAuthError } from "../../../helpers";
import { Link } from "react-router-dom";
import OrderDetails from "./OrderDetails";

function OrderList() {
  const userObj = useSelector((state) => state.user);
  const [showLoader, setShowLoader] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = () => {
    setShowLoader(true);
    Axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/orders/find/" +
        activeTab +
        "?token=" +
        userObj.token
    )
      .then((res) => {
        setShowLoader(false);
        setResults(res.data.result);
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  };
  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < results.length; i++) {
      total += results[i].order.totalAmount;
    }
    return total;
  };
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
                  className={
                    activeTab === "all"
                      ? "orange-border bg-orange"
                      : "orange-border bg-white"
                  }
                  onClick={() => setActiveTab("all")}
                >
                  ALL ORDERS
                </button>
                &nbsp;
                <button
                  style={{ padding: "5px 15px", borderRadius: 5 }}
                  className={
                    activeTab === "pending"
                      ? "orange-border bg-orange"
                      : "orange-border bg-white"
                  }
                  onClick={() => setActiveTab("pending")}
                >
                  ON PREGRESS
                </button>
                &nbsp;
                <button
                  style={{ padding: "5px 15px", borderRadius: 5 }}
                  className={
                    activeTab === "failed"
                      ? "orange-border bg-orange"
                      : "orange-border bg-white"
                  }
                  onClick={() => setActiveTab("failed")}
                >
                  CANCELLED/FAILED ORDERS
                </button>
                &nbsp;
                <button
                  style={{ padding: "5px 15px", borderRadius: 5 }}
                  className={
                    activeTab === "paid"
                      ? "orange-border bg-orange"
                      : "orange-border bg-white"
                  }
                  onClick={() => setActiveTab("paid")}
                >
                  COMPLETED ORDERS
                </button>
              </div>
              {results.length > 0 ? (
                <>
                  <table className="w-100 roboto-font">
                    <thead className="bg-light-orange">
                      <th className="text-center">#ID</th>
                      <th className="text-center">Transaction ID</th>
                      <th className="text-center">Pickup Time</th>
                      <th className="text-center">Pickup Date</th>
                      <th className="text-center">Customer</th>
                      <th className="text-center">Amount</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Date</th>
                      <th className="p-2">Payment Received</th>
                      <th></th>
                    </thead>
                    <tbody>
                      {results.map((item, i) => (
                        <tr className="border-bottom">
                          <td className="p-2 text-center">{i + 1}</td>
                          <td className="text-center">
                            {item.order.transactionId}
                          </td>
                          <td className="text-center">
                            {item.order.pickupTime}
                          </td>
                          <td className="text-center">
                            {item.order.pickupDate}
                          </td>
                          <td className="text-center">{item.customer.name}</td>
                          <td className="text-center">
                            {item.order.totalAmount} RWF
                          </td>
                          <td
                            className={
                              item.order.status !== "paid"
                                ? " text-danger text-center"
                                : " text-success text-center"
                            }
                            style={{ textTransform: "capitalize" }}
                          >
                            {item.order.status}
                          </td>

                          <td className="text-center">
                            {new Date(item.order.date).getDate() +
                              "/" +
                              new Date(item.order.date).getDate() +
                              "/" +
                              new Date(item.order.date).getFullYear()}
                          </td>
                          <td className="text-info text-center">
                            {item.order.status === "paid" ? (
                              <>{item.order.transfered ? "Yes" : "Pending"}</>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td className="p-2 text-center">
                            <button
                              className="btn bg-orange"
                              onClick={() => {
                                setOrderId(item.order._id);
                                setShowModal(true);
                              }}
                            >
                              <FaEye color="white" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {activeTab === "paid" && (
                    <div className="text-end mt-2 quicksand-font">
                      TOTAL AMOUNT: {calculateTotal()} RWF
                    </div>
                  )}
                </>
              ) : (
                <p>No orders found</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Loader showLoader={showLoader} />
      <OrderDetails
        showModal={showModal}
        setShowModal={setShowModal}
        setOrderId={setOrderId}
        orderId={orderId}
      />
    </div>
  );
}

export default OrderList;
