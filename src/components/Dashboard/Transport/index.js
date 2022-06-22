import React, { useEffect, useState } from "react";
import { FaEye, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";
import Axios from "axios";
import AddDriver from "../Modals/AddDriver";
import Loader from "../Modals/Loader";
import { errorHandler, handleAuthError, toastMessage } from "../../../helpers";
import { Link } from "react-router-dom";
function Transport() {
  const userObj = useSelector((state) => state.user);
  const [showLoader, setShowLoader] = useState(true);
  const [price, setPrice] = useState();

  const fetchItemLists = () => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + "/transport/findPrice/")
      .then((res) => {
        setShowLoader(false);
        setPrice(res.data.price);
      })
      .catch((error) => {
        errorHandler(error);
        setShowLoader(false);
      });
  };
  useEffect(() => {
    fetchItemLists();
  }, []);

  const handleUpdate = () => {
    if (price && String(price).trim() !== "") {
      setShowLoader(true);
      Axios.post(
        process.env.REACT_APP_BACKEND_URL + "/transport/updatePrice/",
        { price, token: userObj.token }
      )
        .then((res) => {
          setShowLoader(false);
          toastMessage("success", res.data.msg);
        })
        .catch((error) => {
          errorHandler(error);
          setShowLoader(false);
        });
    } else {
      toastMessage("error", "Price can not be empty.");
    }
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
          <div className="main-contents-container" style={{ padding: "1rem" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: 10,
              }}
            >
              <img
                src={require("../../../assets/logo.png")}
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <div className="text-center">
                <h1 className="quicksand-font">Online Hospitality Finder</h1>
                <h3 className="roboto-font">Transportation service</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginTop: "2rem",
                }}
              >
                <p className="mb-0">Price Per Kilometer (RWF)</p>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ textAlign: "center" }}
                />
                <button
                  className="btn bg-orange text-white mt-2"
                  onClick={handleUpdate}
                >
                  Update Price
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loader showLoader={showLoader} />
    </div>
  );
}

export default Transport;
