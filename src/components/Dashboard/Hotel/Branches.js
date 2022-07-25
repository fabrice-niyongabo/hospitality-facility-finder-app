import React, { useState, useEffect } from "react";
import { FaEye, FaHome, FaPrint, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";
import Loader from "../Modals/Loader";
import Axios from "axios";
import { errorHandler, toastMessage } from "../../../helpers";
import { Link } from "react-router-dom";
import {
  setuserCompanyName,
  setUserEmail,
  setUserFullName,
  setUserPhone,
  setUserRole,
  setUserToken,
} from "../../../actions/user";
import { useNavigate } from "react-router-dom";
function Branches() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userObj = useSelector((state) => state.user);
  const [showLoader, setShowLoader] = useState(false);

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    setShowLoader(true);
    Axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/facility/getMyBranches?token=" +
        userObj.token
    )
      .then((res) => {
        setBranches(res.data.result);
        setShowLoader(false);
      })
      .catch((error) => {
        errorHandler(error);
        setShowLoader(false);
      });
  }, []);

  const switchBranch = (id) => {
    setShowLoader(true);
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/users/updateToken/", {
      token: userObj.token,
      id,
    })
      .then((res) => {
        console.log(res);
        dispatch(setUserFullName(res.data.fullName));
        dispatch(setUserPhone(res.data.phone));
        dispatch(setUserEmail(res.data.email));
        dispatch(setuserCompanyName(res.data.companyName));
        dispatch(setUserRole(res.data.role));
        dispatch(setUserToken(res.data.token));
        navigate("/dashboard");
      })
      .catch((error) => {
        errorHandler(error);
        setShowLoader(false);
      });
  };
  return (
    <div className="body">
      <div className="dashoard-main-container">
        <div className="sidebar">
          <SideBar activate="" />
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
              <div className="manage-room-header mb-3">
                <h3>Switch Branches</h3>
              </div>
              {branches.length > 0 ? (
                <div className="row">
                  {branches.map((item, i) => (
                    <div
                      key={i}
                      className="col-md-4"
                      style={{ height: "100%" }}
                    >
                      <div className="card">
                        <div className="card-body">
                          <p>
                            <b>{item.name}</b>
                          </p>
                          <button
                            className="btn bg-orange text-white"
                            onClick={() => switchBranch(item._id)}
                          >
                            Switch branch
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No branches found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Loader showLoader={showLoader} />
    </div>
  );
}

export default Branches;
