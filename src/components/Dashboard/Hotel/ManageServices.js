import React, { useState, useEffect } from "react";
import { FaEye, FaHome, FaPrint, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";
import Rooms from "../PlaceHolders/Rooms";
import { fetchRooms, setRooms } from "../../../actions/facility";
import AddRoom from "../Modals/AddRoom";
import Loader from "../Modals/Loader";
import RoomDetails from "../Modals/RoomDetails";
import Confirm from "../Modals/Confirm";
import Axios from "axios";
import { errorHandler, handleAuthError, toastMessage } from "../../../helpers";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

function ManageServices() {
  const userObj = useSelector((state) => state.user);
  const [services, setServices] = useState([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [name, setName] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [serviceToBeDeleted, setServiceToBeDeleted] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const deleteService = () => {
    setShowLoader(true);
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/services/delete/", {
      id: serviceToBeDeleted._id,
      token: userObj.token,
    })
      .then((res) => {
        setShowLoader(false);
        toastMessage("success", "Service deleted successful!");
        setServices(
          services.filter((service) => service._id != serviceToBeDeleted._id)
        );
        setServiceToBeDeleted(null);
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  };

  const fetchServices = () => {
    Axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/services/all/?token=" +
        userObj.token
    )
      .then((res) => {
        setIsLoadingServices(false);
        setServices(res.data.result);
      })
      .catch((error) => {
        handleAuthError(error);
        setIsLoadingServices(false);
      });
  };
  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      setShowLoader(true);
      Axios.post(process.env.REACT_APP_BACKEND_URL + "/services/add/", {
        token: userObj.token,
        name,
      })
        .then((res) => {
          setShowLoader(false);
          toastMessage("success", res.data.msg);
          setServices([...services, res.data.service]);
          setName("");
        })
        .catch((error) => {
          setShowLoader(false);
          errorHandler(error);
        });
    }
  };
  return (
    <div className="body">
      <div className="dashoard-main-container">
        <div className="sidebar">
          <SideBar activate="manageservices" />
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
                <h3>Services hotel offers</h3>
              </div>

              <div className="my-3">
                <p>{userObj.companyName} Services</p>

                <form onSubmit={handleSubmit}>
                  <div
                    className="manage-room-header bg-light-orange"
                    style={{ border: "none", padding: 15, borderRadius: 10 }}
                  >
                    <input
                      className="form-control"
                      placeholder="Enter service name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div style={{ width: 150, marginLeft: 10 }}>
                      <button
                        type="submit"
                        className="btn bg-orange text-white"
                      >
                        Add service
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div
                className="mt-4 bg-light-orange"
                style={{ padding: "2rem", borderRadius: 10 }}
              >
                {services.map((service, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <h4>{service.name}</h4>
                    <button
                      className="btn bg-orange"
                      onClick={() => {
                        setServiceToBeDeleted(service);
                        setShowConfirm(true);
                      }}
                    >
                      <MdDelete size={25} /> Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoadingServices === true && services.length === 0 && (
        <Loader showLoader={true} />
      )}
      <Loader showLoader={showLoader} />
      <Confirm
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        callBack={deleteService}
      />
    </div>
  );
}

export default ManageServices;
