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
import { errorHandler, toastMessage } from "../../../helpers";
import { Link } from "react-router-dom";

function ManageRooms() {
  const dispatch = useDispatch();
  const userObj = useSelector((state) => state.user);
  const { rooms } = useSelector((state) => state.facility);
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [itemToView, setItemToView] = useState({});
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [keyWord, setKeyword] = useState("");
  const [roomResults, setRoomResults] = useState([]);

  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < rooms.allRooms.length; i++) {
      if (rooms.allRooms[i].status != "available") {
        total += rooms.allRooms[i].price;
      }
    }
    return total;
  };

  const deleteRoom = () => {
    if (roomToDelete !== null) {
      setShowLoader(true);
      Axios.post(process.env.REACT_APP_BACKEND_URL + "/rooms/delete/", {
        id: roomToDelete._id,
        token: userObj.token,
      })
        .then((res) => {
          setShowLoader(false);
          toastMessage("success", "Room deleted successfully");
          dispatch(
            setRooms(
              rooms.allRooms.filter((room) => room._id != roomToDelete._id)
            )
          );
          setRoomToDelete(null);
        })
        .catch((error) => {
          setShowLoader(false);
          errorHandler(error);
        });
    }
  };

  const handleSearch = (keyWord) => {
    setKeyword(keyWord);
    if (keyWord.trim() !== "") {
      const res = [];
      for (let i = 0; i < rooms.allRooms.length; i++) {
        const item = rooms.allRooms[i].roomNumber.toLowerCase();
        if (item.includes(keyWord.toLowerCase())) {
          res.push(rooms.allRooms[i]);
        }
      }
      setRoomResults(res);
    } else {
      setRoomResults([]);
      setKeyword("");
    }
  };

  useEffect(() => {
    dispatch(fetchRooms());
  }, []);
  return (
    <div className="body">
      <div className="dashoard-main-container">
        <div className="sidebar">
          <SideBar activate="managerooms" />
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
                <h3>Manage Rooms</h3>
                <div>
                  <button className="btn" onClick={() => setShowModal(true)}>
                    Add item
                  </button>
                </div>
              </div>

              <div className="my-3">
                <input
                  className="form-control"
                  placeholder="Search rooms by room number"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              {rooms.allRooms.length > 0 && keyWord === "" ? (
                <>
                  <div className="room-table">
                    <table>
                      <thead>
                        <th>Room No</th>
                        <th>Room Type</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Action</th>
                      </thead>
                      <tbody>
                        {rooms.allRooms.map((room, i) => (
                          <tr key={room}>
                            <td>{room.roomNumber}</td>
                            <td>{room.type}</td>
                            <td>{room.price} RWF</td>
                            <td>{room.status}</td>
                            <td>{room.checkIn ? "Yes" : "No"}</td>
                            <td>{room.checkOut ? "Yes" : "No"}</td>
                            <td>
                              <div className="icons">
                                <button
                                  onClick={() => {
                                    setItemToView(room);
                                    setShowRoomDetails(true);
                                  }}
                                >
                                  <div>
                                    <FaEye color="black" size={15} />
                                  </div>
                                </button>
                                <button
                                  onClick={() => {
                                    setRoomToDelete(room);
                                    setShowConfirm(true);
                                  }}
                                >
                                  <div>
                                    <FaTrash color="black" size={15} />
                                  </div>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  {keyWord !== "" && roomResults.length > 0 ? (
                    <>
                      <div className="room-table">
                        <table>
                          <thead>
                            <th>Room No</th>
                            <th>Room Type</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Action</th>
                          </thead>
                          <tbody>
                            {roomResults.map((room, i) => (
                              <tr key={room}>
                                <td>{room.roomNumber}</td>
                                <td>{room.type}</td>
                                <td>{room.price} RWF</td>
                                <td>{room.status}</td>
                                <td>{room.checkIn ? "Yes" : "No"}</td>
                                <td>{room.checkOut ? "Yes" : "No"}</td>
                                <td>
                                  <div className="icons">
                                    <button
                                      onClick={() => {
                                        setItemToView(room);
                                        setShowRoomDetails(true);
                                      }}
                                    >
                                      <div>
                                        <FaEye color="black" size={15} />
                                      </div>
                                    </button>
                                    <button
                                      onClick={() => {
                                        setRoomToDelete(room);
                                        setShowConfirm(true);
                                      }}
                                    >
                                      <div>
                                        <FaTrash color="black" size={15} />
                                      </div>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className="mt-3">No rooms found</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {rooms.loading === true && rooms.allRooms?.length === 0 && (
        <Loader showLoader={true} />
      )}
      <AddRoom
        showModal={showModal}
        setShowModal={setShowModal}
        setShowLoader={setShowLoader}
        rooms={rooms.allRooms}
      />
      <RoomDetails
        setShowRoomDetails={setShowRoomDetails}
        showRoomDetails={showRoomDetails}
        room={itemToView}
      />
      <Loader showLoader={showLoader} />
      <Confirm
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        callBack={deleteRoom}
      />
    </div>
  );
}

export default ManageRooms;
