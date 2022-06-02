import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import Loader from "../Modals/Loader";
import Axios from "axios";
import { errorHandler } from "../../../helpers";
import { useSelector } from "react-redux";
import { FaPrint, FaCheckCircle } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import Transfer from "../Modals/Transfer";
function ManagePayments() {
  const { token } = useSelector((state) => state.user);
  const [showLoader, setShowLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [tx, setTx] = useState({});
  useEffect(() => {
    fetchData();
  }, [activeTab]);
  const fetchData = () => {
    if (activeTab === "orders") {
      fetchOrders();
    } else {
      fetcBookings();
    }
  };
  const fetchOrders = () => {
    setShowLoader(true);
    Axios.get(
      process.env.REACT_APP_BACKEND_URL + "/orders/master/?token=" + token
    )
      .then((res) => {
        setResults(res.data.result);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  };
  const fetcBookings = () => {
    setShowLoader(true);
    Axios.get(
      process.env.REACT_APP_BACKEND_URL + "/booking/master/?token=" + token
    )
      .then((res) => {
        setResults(res.data.result);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  };
  return (
    <>
      <div className="body">
        <div className="dashoard-main-container">
          <div className="sidebar">
            <SideBar activate="payments" />
          </div>
          <div className="contents">
            <div className="contents-header">
              <div className="title">
                <FaHome color="black" size={30} />
                <Link to="/">
                  <span>Back To Home Page</span>
                </Link>
              </div>
              <div className="company">Hospitality finder admin panel</div>
            </div>
            <div className="main-contents-container p-2">
              <div className="bg-white p-3" style={{ borderRadius: 10 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className="mb-3 border-bottom"
                >
                  <h2>Payment History</h2>
                  <button className="btn bg-orange text-white">
                    <FaPrint />
                  </button>
                </div>
                <table>
                  <tr>
                    <td
                      className="p-2"
                      onClick={() => setActiveTab("orders")}
                      style={{ cursor: "pointer" }}
                    >
                      <h4
                        className={
                          activeTab === "orders" ? "bg-orange px-2" : ""
                        }
                      >
                        ORDERS
                      </h4>
                    </td>
                    <td>&nbsp;&nbsp;</td>
                    <td
                      onClick={() => setActiveTab("bookings")}
                      style={{ cursor: "pointer" }}
                    >
                      <h4
                        className={
                          activeTab === "bookings" ? "bg-orange px-2" : ""
                        }
                      >
                        BOOKINGS
                      </h4>
                    </td>
                  </tr>
                </table>
                <table className="table">
                  <tr>
                    <th className="p-2">#ID</th>
                    <th className="p-2">Transaction ID</th>
                    <th className="p-2">Amount Paid</th>
                    <th className="p-2">income(7%)</th>
                    <th className="p-2">Amount to transfer(93%)</th>
                    <th className="p-2">Facility Name</th>
                    <th className="p-2">Facility Type</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Transfared</th>
                    <th className="p-2">Status</th>
                  </tr>
                  {results.map((item, i) => (
                    <tr
                      key={i}
                      style={{ borderTopColor: "#CCC", borderTopWidth: 1 }}
                    >
                      <td className="p-2">{i + 1}</td>
                      <td className="p-2">{item.transactionId}</td>
                      <td className="p-2">
                        {activeTab === "orders" ? (
                          <>{item.totalAmount}</>
                        ) : (
                          <>
                            {item.paymentStatus === "paid" ? (
                              <>{item.totalAmount}</>
                            ) : (
                              <>{item.totalDays * item.pricePerDay}</>
                            )}
                          </>
                        )}{" "}
                        RWF
                      </td>
                      <td className="p-2">
                        {activeTab === "orders" ? (
                          <>
                            {item.status === "paid" ? (
                              <>{(item.totalAmount * 7) / 100} RWF</>
                            ) : (
                              <>-</>
                            )}
                          </>
                        ) : (
                          <>
                            {item.paymentStatus === "paid" ? (
                              <>{(item.totalAmount * 7) / 100} RWF</>
                            ) : (
                              <>-</>
                            )}
                          </>
                        )}
                      </td>
                      <td className="p-2">
                        {activeTab === "orders" ? (
                          <>
                            {item.status === "paid" ? (
                              <>{(item.totalAmount * 93) / 100} RWF</>
                            ) : (
                              <>-</>
                            )}
                          </>
                        ) : (
                          <>
                            {item.paymentStatus === "paid" ? (
                              <>{(item.totalAmount * 93) / 100} RWF</>
                            ) : (
                              <>-</>
                            )}
                          </>
                        )}
                      </td>
                      <td className="p-2">{item.facility[0].name}</td>
                      <td
                        className="p-2"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.facility[0].type}
                      </td>
                      <td className="p-2">
                        {activeTab === "orders" ? (
                          <>
                            {new Date(item.date).getDate()}-
                            {new Date(item.date).getMonth() + 1}-
                            {new Date(item.date).getFullYear() + 1}
                          </>
                        ) : (
                          <>
                            {new Date(item.transactionDate).getDate()}-
                            {new Date(item.transactionDate).getMonth() + 1}-
                            {new Date(item.transactionDate).getFullYear() + 1}
                          </>
                        )}
                      </td>
                      <td
                        className="p-2"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item?.status === "paid" ||
                        item?.paymentStatus === "paid" ? (
                          <>
                            {item.transfered ? (
                              <FaCheckCircle size={30} />
                            ) : (
                              <button
                                className="btn bg-orange"
                                onClick={() => {
                                  setTx(item);
                                  setShowModal(true);
                                }}
                              >
                                <BiSend size={25} color="#FFF" />
                              </button>
                            )}
                          </>
                        ) : (
                          <>NO</>
                        )}
                      </td>
                      {activeTab === "orders" ? (
                        <>
                          {item.status === "failed" && (
                            <td
                              className="p-2 text-danger"
                              style={{ textTransform: "capitalize" }}
                            >
                              {item.status}
                            </td>
                          )}
                          {item.status === "pending" && (
                            <td
                              className="p-2 text-info"
                              style={{ textTransform: "capitalize" }}
                            >
                              {item.status}
                            </td>
                          )}
                          {item.status === "paid" && (
                            <td
                              className="p-2 text-success"
                              style={{ textTransform: "capitalize" }}
                            >
                              {item.status}
                            </td>
                          )}
                        </>
                      ) : (
                        <>
                          {item.paymentStatus === "failed" && (
                            <td
                              className="p-2 text-danger"
                              style={{ textTransform: "capitalize" }}
                            >
                              {item.paymentStatus}
                            </td>
                          )}
                          {item.paymentStatus === "pending" && (
                            <td
                              className="p-2 text-info"
                              style={{ textTransform: "capitalize" }}
                            >
                              {item.paymentStatus}
                            </td>
                          )}
                          {item.paymentStatus === "paid" && (
                            <td
                              className="p-2 text-success"
                              style={{ textTransform: "capitalize" }}
                            >
                              {item.paymentStatus}
                            </td>
                          )}
                        </>
                      )}
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loader showLoader={showLoader} />
      <Transfer
        showModal={showModal}
        setShowModal={setShowModal}
        setShowLoader={setShowLoader}
        loadData={fetchData}
        setTx={setTx}
        tx={tx}
      />
    </>
  );
}

export default ManagePayments;
