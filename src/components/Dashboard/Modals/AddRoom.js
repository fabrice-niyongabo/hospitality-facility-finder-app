import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { handleAuthError, toastMessage, uploadImage } from "../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "../../../actions/facility";
function AddRoom({ showModal, setShowModal, setShowLoader, rooms }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState(50000);
  const [roomType, setRoomType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsSubmitting(false);
    setRoomNumber("");
    setRoomType("");
    setDescription("");
    setImage("");
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowLoader(true);
    uploadImage(image)
      .then((res) => {
        const { fileName } = res.data;
        Axios.post(process.env.REACT_APP_BACKEND_URL + "/rooms/add/", {
          roomNumber,
          price,
          roomType,
          description,
          image: fileName,
          token,
        })
          .then((response) => {
            setShowLoader(false);
            setShowModal(false);
            toastMessage("success", "Room has been added successful");
            dispatch(setRooms([...rooms, response.data.room]));
          })
          .catch((error) => {
            setIsSubmitting(false);
            setShowLoader(false);
            handleAuthError(error);
            if (error?.response.data.msg) {
              toastMessage("error", error?.response.data.msg);
            } else {
              toastMessage("error", error.message);
            }
          });
        setShowLoader(false);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setShowLoader(false);
        if (error.msg) {
          toastMessage("error", error.msg);
        } else {
          toastMessage("error", error.message);
        }
      });
  };
  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Room</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group my-2">
              <input
                type="text"
                placeholder="Room Number"
                className="form-control"
                required
                disabled={isSubmitting}
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </div>
            <div className="form-group my-2">
              <input
                type="number"
                placeholder="Room Price"
                className="form-control"
                required
                disabled={isSubmitting}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group my-2">
              <input
                type="text"
                placeholder="Room Type"
                className="form-control"
                required
                disabled={isSubmitting}
                onChange={(e) => setRoomType(e.target.value)}
              />
            </div>
            <div className="form-group my-2">
              <textarea
                placeholder="Room Description"
                className="form-control"
                required
                disabled={isSubmitting}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group my-2">
              <span>Choose Room Image</span>
              <input
                type="file"
                className="form-control"
                required
                disabled={isSubmitting}
                onChange={(t) => setImage(t.target.files[0])}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Save Room
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default AddRoom;
