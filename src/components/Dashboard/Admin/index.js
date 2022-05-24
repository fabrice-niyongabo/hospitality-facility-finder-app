import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import Loader from "../Modals/Loader";
import Axios from "axios";
import { errorHandler, fetchCoordinates } from "../../../helpers";
import AddHotel from "../Modals/AddHotel";
import { useSelector } from "react-redux";
function Admin() {
  const { token } = useSelector((state) => state.user);
  const [showLoader, setShowLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  useEffect(() => {
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/users/getAll/", { token })
      .then((res) => {
        if (res.data.users && res.data.users.length > 0) {
          setUsers(res.data.users);
        }
      })
      .catch((error) => {
        console.log(error);
        errorHandler(error);
      });
    Axios.get(
      process.env.REACT_APP_BACKEND_URL + "/facility/find/category/hotels"
    )
      .then((res) => {
        setResults(res.data.result);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
    getCors();
  }, []);

  const getCors = () => {
    fetchCoordinates()
      .then((res) => {
        setLat(res.lat);
        setLong(res.long);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
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
                  className="mb-3"
                >
                  <h2>Hotels</h2>
                  <button
                    className="btn bg-orange text-white"
                    onClick={() => setShowModal(true)}
                  >
                    Add hotel
                  </button>
                </div>
                <table className="table">
                  <tr>
                    <th className="p-2">#ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Stars</th>
                    <th className="p-2">Average price</th>
                    <th className="p-2">Lat</th>
                    <th className="p-2">Long</th>
                    <th className="p-2">Address</th>
                  </tr>
                  {results.map((item, i) => (
                    <tr
                      key={i}
                      style={{ borderTopColor: "#CCC", borderTopWidth: 1 }}
                    >
                      <td className="p-2">{i + 1}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.stars}</td>
                      <td className="p-2">{item.averagePrice}</td>
                      <td className="p-2">{item.lat}</td>
                      <td className="p-2">{item.long}</td>
                      <td className="p-2">{item.address}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loader showLoader={showLoader} />
      <AddHotel
        showModal={showModal}
        setShowLoader={setShowLoader}
        setShowModal={setShowModal}
        getCors={getCors}
        lat={lat}
        long={long}
        users={users}
      />
    </>
  );
}

export default Admin;
