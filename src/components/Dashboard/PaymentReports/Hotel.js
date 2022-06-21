import React, { useState, useEffect } from "react";
import { FaHome, FaPrint } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "../Hotel/SideBar";
import Loader from "../Modals/Loader";
import Axios from "axios";
import { errorHandler } from "../../../helpers";
import { Link } from "react-router-dom";
import { BiReset } from "react-icons/bi";

function ManageRooms() {
  const userObj = useSelector((state) => state.user);
  const [showLoader, setShowLoader] = useState(true);
  const [results, setResults] = useState([]);
  const [allData, setAllData] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    Axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/booking/manager/?token=" +
        userObj.token
    )
      .then((res) => {
        setResults(res.data.result);
        setAllData(res.data.result);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  }, []);

  const handleFilter = (date) => {
    setDate(date);
    const dt = date.split("-");
    setResults(
      allData.filter(
        (item) =>
          new Date(item.transactionDate).getMonth() + 1 == dt[1] &&
          new Date(item.transactionDate).getFullYear() == dt[0]
      )
    );
  };
  const handleReset = () => {
    setResults(allData);
    setDate("");
  };

  const calculateIncome = () => {
    let sum = 0;
    for (let i = 0; i < results.length; i++) {
      sum += (results[i].totalAmount * 7) / 100;
    }
    return sum;
  };
  const calculateTotal = () => {
    let sum = 0;
    for (let i = 0; i < results.length; i++) {
      sum += (results[i].totalAmount * 93) / 100;
    }
    return sum;
  };
  return (
    <div className="body">
      <div className="dashoard-main-container">
        <div className="sidebar">
          <SideBar activate="paymentreport" />
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
                padding: "1rem",
                borderRadius: 10,
                backgroundColor: "#fff",
              }}
            >
              <div className="manage-room-header">
                <h3>Payment Reports</h3>
                <div>
                  <table>
                    <tr>
                      <td>
                        <table>
                          <tr>
                            <td>
                              <input
                                type="month"
                                onChange={(e) => handleFilter(e.target.value)}
                              />
                            </td>
                            <td className="text-center">
                              <button
                                className="btn"
                                style={{
                                  backgroundColor: "transparent",
                                  color: "brown",
                                }}
                                onClick={() => handleReset()}
                              >
                                <BiReset size={25} />
                              </button>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td>&nbsp; &nbsp;</td>
                      <td>
                        <button
                          className="btn"
                          onClick={() =>
                            window.open(
                              process.env.REACT_APP_URL +
                                "/print/paymentreport/" +
                                (date === "" ? "all" : date)
                            )
                          }
                        >
                          <FaPrint />
                        </button>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table">
                  <tr>
                    <th className="p-2">#ID</th>
                    <th className="p-2" style={{ minWidth: 150 }}>
                      Transaction ID
                    </th>
                    <th className="p-2" style={{ minWidth: 150 }}>
                      Amount Paid
                    </th>
                    <th className="p-2">Charges(7%)</th>
                    <th className="p-2" style={{ minWidth: 150 }}>
                      Amount to receive(93%)
                    </th>
                    <th className="p-2" style={{ minWidth: 150 }}>
                      Customer name
                    </th>
                    <th className="p-2" style={{ minWidth: 150 }}>
                      Facility Name
                    </th>
                    <th className="p-2" style={{ minWidth: 150 }}>
                      Facility Type
                    </th>
                    <th className="p-2" style={{ minWidth: 150 }}>
                      Date
                    </th>
                    <th className="p-2">Received</th>
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
                        {item.paymentStatus === "paid" ? (
                          <>{item.totalAmount}</>
                        ) : (
                          <>{item.totalDays * item.pricePerDay}</>
                        )}
                        RWF
                      </td>
                      <td className="p-2">
                        {item.paymentStatus === "paid" ? (
                          <>{(item.totalAmount * 7) / 100} RWF</>
                        ) : (
                          <>-</>
                        )}
                      </td>
                      <td className="p-2">
                        {item.paymentStatus === "paid" ? (
                          <>{(item.totalAmount * 93) / 100} RWF</>
                        ) : (
                          <>-</>
                        )}
                      </td>
                      <td>{item.customer[0].fullName}</td>
                      <td className="p-2">{item.facility[0].name}</td>
                      <td
                        className="p-2"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.facility[0].type}
                      </td>
                      <td className="p-2">
                        {new Date(item.transactionDate).getDate()}-
                        {new Date(item.transactionDate).getMonth() + 1}-
                        {new Date(item.transactionDate).getFullYear()}
                      </td>
                      <td
                        className="p-2"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item?.status === "paid" ||
                        item?.paymentStatus === "paid" ? (
                          <>{item.transfered}</>
                        ) : (
                          <>NO</>
                        )}
                      </td>
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
                    </tr>
                  ))}
                </table>
              </div>
              <br />
              <p className="h5 m-0 p-0">
                TOTAL CHARGES: {calculateIncome()} RWF
              </p>
              <p className="h5 m-0 p-0">
                TOTAL EARNINGS: {calculateTotal()} RWF
              </p>
            </div>
          </div>
        </div>
      </div>
      <Loader showLoader={showLoader} />
    </div>
  );
}

export default ManageRooms;
