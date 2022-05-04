import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Axios from "axios";
import { handleAuthError, toastMessage } from "../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../../../actions/facility";
function RoomDetails({ room, setShowRoomDetails, showRoomDetails }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [editRoom, setEditRoom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editPrice, setEditPrice] = useState(room.price);
  const [editDescription, setEditDescription] = useState(room.description);
  const handleSubmit = () => {
    setIsSubmitting(true);
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/rooms/update/", {
      description: editDescription,
      price: editPrice,
      id: room._id,
      token,
    })
      .then((res) => {
        toastMessage("success", "Room updated successfull");
        dispatch(fetchRooms());
        setShowRoomDetails(false);
      })
      .catch((error) => {
        handleAuthError(error);
        if (error.response.data.msg) {
          toastMessage("error", error.response.data.msg);
        } else {
          toastMessage("error", error.message);
        }
      });
  };

  useEffect(() => {
    setEditRoom(false);
    setEditPrice(room.price);
    setEditDescription(room.description);
  }, [showRoomDetails]);
  return (
    <div>
      <Modal
        show={showRoomDetails}
        onHide={() => setShowRoomDetails(false)}
        backdrop="static"
        size={editRoom ? "sm" : "lg"}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{editRoom ? "Edit Room" : room.roomNumber}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!editRoom && (
            <table style={{ width: "100%" }}>
              <tr>
                <td style={{ width: "40%" }} valign="top">
                  <img
                    src={process.env.REACT_APP_BACKEND_FILE_URL + room.image}
                    style={{ width: "100%" }}
                  />
                </td>
                <td>
                  <div style={{ paddingLeft: 10 }}>
                    <table className="w-100">
                      <tr style={{ borderBottom: "1px solid #ccc" }}>
                        <td>Room type</td>
                        <td>{room.type}</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #ccc" }}>
                        <td>Room Price</td>
                        <td>{room.price} RWF</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #ccc" }}>
                        <td>Status</td>
                        <td>{room.status}</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #ccc" }}>
                        <td>Check In</td>
                        <td>{room.checkIn ? "Yes" : "No"}</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #ccc" }}>
                        <td>Check out</td>
                        <td>{room.Checkout ? "Yes" : "No"}</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #ccc" }}>
                        <td colSpan={2}>
                          <p className="m-0 p-0 pb2">Description:</p>
                          {room.description}
                        </td>
                      </tr>
                    </table>
                    <div className="text-end mt-3">
                      <button
                        className="btn bg-orange text-white"
                        onClick={() => setEditRoom(true)}
                      >
                        Edit Room
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          )}
          {editRoom && (
            <div>
              <div className="mb-3">
                <label>Room Price</label>
                <input
                  type="text"
                  value={editPrice}
                  className="form-control"
                  onChange={(e) => setEditPrice(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea
                  className="form-control"
                  onChange={(e) => setEditDescription(e.target.value)}
                  required
                >
                  {editDescription}
                </textarea>
              </div>
            </div>
          )}
        </Modal.Body>
        {editRoom && (
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Savng Changes" : "Save Changes"}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}

export default RoomDetails;
