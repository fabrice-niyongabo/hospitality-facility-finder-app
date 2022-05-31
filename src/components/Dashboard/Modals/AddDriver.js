import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import {
  errorHandler,
  handleAuthError,
  toastMessage,
  uploadImage,
} from "../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "../../../actions/facility";
function AddRestaurantItem({
  showModal,
  setShowModal,
  setShowLoader,
  itemsList,
  setItemsList,
  loadData,
  item,
}) {
  const { token } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [driverId, setDriverId] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("English");
  const [status, setStatus] = useState("available");

  useEffect(() => {
    if (item._id) {
      setName(item.name);
      setDriverId(item.driverId);
      setPhone(item.phoneNumber);
      setLanguage(item.language);
      setStatus(item.status);
    } else {
      setName("");
      setDriverId("");
      setPhone("");
      setLanguage("");
      setStatus("");
    }
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    if (item._id) {
      Axios.post(process.env.REACT_APP_BACKEND_URL + "/drivers/edit/", {
        name,
        driverId,
        phoneNumber: phone,
        id: item._id,
        language,
        status,
        token,
      })
        .then((response) => {
          setShowLoader(false);
          setShowModal(false);
          toastMessage("success", response.data.msg);
          loadData();
        })
        .catch((error) => {
          setShowLoader(false);
          errorHandler(error);
        });
    } else {
      Axios.post(process.env.REACT_APP_BACKEND_URL + "/drivers/register/", {
        name,
        driverId,
        phoneNumber: phone,
        language,
        status,
        token,
      })
        .then((response) => {
          setShowLoader(false);
          setShowModal(false);
          toastMessage("success", "Driver has been registered successful");
          setItemsList([...itemsList, response.data.driver]);
        })
        .catch((error) => {
          setShowLoader(false);
          errorHandler(error);
        });
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
          <Modal.Title>{item._id ? "Edit" : "Add New"} Driver</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group my-2">
              <label>Driver name</label>
              <input
                type="text"
                placeholder="Driver name"
                className="form-control"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group my-2">
              <label>Driver ID </label>
              <input
                type="text"
                placeholder="Driver ID"
                className="form-control"
                required
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
              />
            </div>
            <div className="form-group my-2">
              <label>Phone number</label>
              <input
                type="text"
                placeholder="Driver's phone number : 07..."
                className="form-control"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                minLength={10}
              />
            </div>
            <div className="form-group my-2">
              <label>Language</label>
              <select
                className="form-control"
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
                required
              >
                <option value=""></option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Kinyarwanda">Kinyarwanda</option>
              </select>
            </div>
            <div className="form-group my-2">
              <label>Status</label>
              <select
                className="form-control"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                required
              >
                <option value=""></option>
                <option value="available">Available</option>
                <option value="not available">Not Available</option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Save Driver
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default AddRestaurantItem;
