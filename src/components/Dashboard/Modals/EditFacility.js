import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { errorHandler, toastMessage } from "../../../helpers";
import { useSelector } from "react-redux";
function EditFacility({
  showModal,
  setShowModal,
  setShowLoader,
  facility,
  getCors,
  getData,
  users,
  fetchData,
}) {
  const { token } = useSelector((state) => state.user);
  const [name, setName] = useState(facility.name);
  const [latitude, setLatitude] = useState(facility.lat);
  const [longitude, setLongitude] = useState(facility.long);
  const [stars, setStars] = useState(facility.stars);
  const [averagePrice, setAveragePrice] = useState(facility.averagePrice);
  const [address, setAddress] = useState(facility.address);
  const [managerId, setManagerId] = useState(facility.managerId);
  const [status, setStatus] = useState(facility.status);
  const [type, setType] = useState(facility.type);
  useEffect(() => {
    if (showModal) {
      getCors();
      setLongitude(facility.long);
      setLatitude(facility.lat);
      setManagerId(facility.managerId);
      setAveragePrice(facility.averagePrice);
      setAddress(facility.address);
      setName(facility.name);
      setStatus(facility.status);
      setType(facility.type);
    }
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.trim() !== "" &&
      latitude.trim() !== "" &&
      longitude.trim() !== "" &&
      stars != "" &&
      address.trim() !== "" &&
      managerId.trim() !== ""
    ) {
      setShowLoader(true);
      Axios.post(process.env.REACT_APP_BACKEND_URL + "/facility/edit/", {
        token,
        name,
        latitude,
        longitude,
        averagePrice,
        stars,
        address,
        managerId,
        type: facility.type,
        id: facility._id,
        status: status,
        type: type,
      })
        .then((res) => {
          setShowModal(false);
          toastMessage("success", res.data.msg);
          getData();
          fetchData();
        })
        .catch((error) => {
          setShowLoader(false);
          errorHandler(error);
        });
    } else {
      toastMessage("info", "All fields are required");
    }
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
          <Modal.Title>Edit Facility</Modal.Title>
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
                <option value={facility.managerId}>Current manager</option>
                {users.map((user, i) => (
                  <option key={i} value={user._id}>
                    {user.fullName} - 0{user.phone}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group my-2">
              <label>Facility Type</label>
              <select
                type="text"
                className="form-select"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="hotel">hotel</option>
                <option value="restaurant">Restaurant</option>
                <option value="coffeeshop">offee shop</option>
              </select>
            </div>
            <div className="form-group my-2">
              <label>Status</label>
              <select
                type="text"
                className="form-select"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
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

export default EditFacility;
