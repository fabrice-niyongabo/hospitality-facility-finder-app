import React, { useState, useRef } from "react";
import { FaEye, FaHome, FaPrint, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";
import Loader from "../Modals/Loader";
import Axios from "axios";
import { errorHandler, toastMessage } from "../../../helpers";
import { setUserFullName, setUserPhone } from "../../../actions/user";
import Password from "../Modals/Password";
import { Link } from "react-router-dom";

function MyAccount() {
  const dispatch = useDispatch();
  const userObj = useSelector((state) => state.user);
  const [name, setName] = useState(userObj.fullName);
  const [phone, setPhone] = useState(userObj.phone);
  const [phoneError, setPhoneError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const phoneRef = useRef(null);

  const validPhoneCode = ["8", "9", "2", "3"];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.trim() === "") {
      setPhoneError("Please enter your phone number");
      phoneRef.current.classList.add("is-invalid");
      phoneRef.current.focus();
      return;
    } else if (
      !validPhoneCode.includes(phone[1]) ||
      phone[0] !== "7" ||
      phone.length !== 9
    ) {
      setPhoneError(
        "Invalid phone number. please provide a valid MTN or AIRTEL-TIGO phone number."
      );
      phoneRef.current.classList.add("is-invalid");
      phoneRef.current.focus();
      return;
    } else {
      phoneRef.current.classList.remove("is-invalid");
      setPhoneError("");
    }
    if (name.trim() !== "" && phone.trim() !== "") {
      setShowLoader(true);
      Axios.post(process.env.REACT_APP_BACKEND_URL + "/users/updateInfo/", {
        token: userObj.token,
        name,
        phone,
      })
        .then((res) => {
          setShowLoader(false);
          toastMessage("success", "User information updated successful!");
          dispatch(setUserPhone(phone));
          dispatch(setUserFullName(name));
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
          <SideBar activate="account" />
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
                <h3>Manage your account</h3>
              </div>

              <div className="my-3">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label>Full names</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      value={name}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email address</label>
                    <input
                      type="email"
                      disabled
                      className="form-control"
                      value={userObj.email}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Phone number</label>
                    <input
                      type="number"
                      required
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      ref={phoneRef}
                      className="form-control"
                    />
                    <span style={{ color: "red" }}>{phoneError}</span>
                  </div>
                  <div className="text-center">
                    <button
                      className="btn bg-orange text-white"
                      type="button"
                      onClick={() => setShowModal(true)}
                    >
                      Change password
                    </button>
                    &nbsp; &nbsp;
                    <button className="btn bg-orange text-white" type="submit">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loader showLoader={showLoader} />
      <Password
        setShowLoader={setShowLoader}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

export default MyAccount;
