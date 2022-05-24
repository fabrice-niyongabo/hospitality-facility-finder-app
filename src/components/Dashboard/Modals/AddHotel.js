import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { handleAuthError, toastMessage, uploadImage } from "../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "../../../actions/facility";
function AddHotel({
  showModal,
  setShowModal,
  setShowLoader,
  long,
  lat,
  getCors,
  users,
}) {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(long);
  const [stars, setStars] = useState("");
  const [averagePrice, setAveragePrice] = useState("");
  const [address, setAddress] = useState("");
  const [managerId, setManagerId] = useState("");
  useEffect(() => {
    getCors();
    setLongitude(long);
    setLatitude(lat);
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // process.env.REACT_APP_BACKEND_URL
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
          <Modal.Title>Register New Hotel</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group my-2">
              <input
                type="text"
                placeholder="Hotel name"
                className="form-control"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group my-2">
              <label>Stars</label>
              <select
                type="text"
                placeholder="Stars"
                className="form-select"
                required
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              >
                <option value={0}>0</option>
                <option value={2}>1</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div className="form-group my-2">
              <input
                type="number"
                placeholder="Average price"
                className="form-control"
                required
                value={averagePrice}
                onChange={(e) => setAveragePrice(e.target.value)}
              />
            </div>
            <div className="form-group my-2">
              <input
                type="text"
                placeholder="Address"
                className="form-control"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="card">
              <div className="card-body">
                <span>Facility location coordinates</span>
                <div className="form-group my-2">
                  <label>Latitude</label>
                  <input
                    type="text"
                    placeholder="Latitude"
                    className="form-control"
                    required
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </div>
                <div className="form-group my-2">
                  <label>Longitude</label>
                  <input
                    type="text"
                    placeholder="Longitude"
                    className="form-control"
                    required
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group my-2">
              <label>Manager</label>
              <select
                type="text"
                placeholder="Stars"
                className="form-select"
                required
                value={managerId}
                onChange={(e) => setManagerId(e.target.value)}
              >
                <option value="">Select manager</option>
                {users.map((user, i) => (
                  <option key={i} value={user._id}>
                    {user.fullName} 0{user.phone}
                  </option>
                ))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default AddHotel;
