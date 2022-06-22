import React, { useEffect, useState } from "react";
import { FaEye, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";
import Axios from "axios";
import AddDriver from "../Modals/AddDriver";
import Loader from "../Modals/Loader";
import { errorHandler, handleAuthError, toastMessage } from "../../../helpers";
import ViewRestaurantItem from "../Modals/ViewRestaurantItem";
import Confirm from "../Modals/Confirm";
import { Link } from "react-router-dom";
import { FaPrint } from "react-icons/fa";
import AssignDriver from "../Modals/AssignDriver";
function ManageCustomers() {
  const userObj = useSelector((state) => state.user);
  const [itemsList, setItemsList] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewItem, setPreviewItem] = useState({});
  const [tx, setTx] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const fetchItemLists = () => {
    Axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/transport/find/?token=" +
        userObj.token
    )
      .then((res) => {
        console.log(res.data);
        setShowLoader(false);
        setItemsList(res.data.result);
      })
      .catch((error) => {
        handleAuthError(error);
        setItemsList([]);
        setShowLoader(false);
      });
  };
  useEffect(() => {
    fetchItemLists();
  }, []);

  return (
    <div className="body">
      <div className="dashoard-main-container">
        <div className="sidebar">
          <SideBar activate="managecustomers" />
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
                {/* <button
                  style={{ padding: "5px 15px", borderRadius: 5 }}
                  className="orange-border bg-white"
                  onClick={() => {
                    setPreviewItem({});
                    setShowModal(true);
                  }}
                >
                  Daily report
                </button>
                &nbsp;
                <button
                  style={{ padding: "5px 15px", borderRadius: 5 }}
                  className="orange-border bg-white"
                  onClick={() => setShowConfirm(true)}
                >
                  Monthly report
                </button> */}
                <h4>Manage customers</h4>
              </div>
              {itemsList.length > 0 ? (
                <div className="table-responsive">
                  <table className="w-100 roboto-font">
                    <thead className="bg-light-orange">
                      <th className="p-2">#</th>
                      <th className="p-2" style={{ minWidth: 150 }}>
                        Customer Name
                      </th>
                      <th className="p-2" style={{ minWidth: 150 }}>
                        Phone number
                      </th>
                      <th className="p-2" style={{ minWidth: 150 }}>
                        Language
                      </th>
                      <th className="p-2" style={{ minWidth: 150 }}>
                        Amount Paid
                      </th>
                      <th className="p-2" style={{ minWidth: 150 }}>
                        Facility Name
                      </th>
                      <th className="p-2" style={{ minWidth: 150 }}>
                        Destination
                      </th>
                      <th className="p-2" style={{ minWidth: 150 }}>
                        Diperture time
                      </th>
                      <th className="p-2" style={{ minWidth: 150 }}>
                        Diperture date
                      </th>
                      <th className="p-2" style={{ minWidth: 150 }}>
                        Driver ID
                      </th>
                      <th className="p-2">Status</th>
                      <th className="p-2" style={{ minWidth: 150 }}>
                        Delivery Status
                      </th>
                      <th></th>
                    </thead>
                    <tbody>
                      {itemsList.map((item, i) => (
                        <tr key={i}>
                          <td className="p-2">{i + 1}</td>
                          <td className="p-2">{item.customer.fullName}</td>
                          <td className="p-2">{item.customer.phone}</td>
                          <td className="p-2">{item.driverLanguage}</td>
                          <td className="p-2">{item.amountPaid} RWF</td>
                          <td className="p-2">{item.facility.name}</td>
                          <td className="p-2">{item.facility.address}</td>
                          <td className="p-2">{item.departureTime}</td>
                          <td className="p-2">{item.departureDate}</td>
                          <td className="p-2">{item.driverId}</td>
                          <td className="p-2">{item.status}</td>
                          <td className="p-2">{item.deliveryStatus}</td>
                          {item.deliveryStatus !== "delivered" && (
                            <td className="p-2">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <button
                                  className="btn bg-orange text-white"
                                  onClick={() => {
                                    setTx(item);
                                    setShowModal(true);
                                  }}
                                  style={{ marginRight: 10, width: 140 }}
                                >
                                  Assign Driver
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No items found</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Loader showLoader={showLoader} />
      <AssignDriver
        setShowLoader={setShowLoader}
        showModal={showModal}
        setShowModal={setShowModal}
        tx={tx}
        setTx={setTx}
        loadData={fetchItemLists}
      />
    </div>
  );
}

export default ManageCustomers;
