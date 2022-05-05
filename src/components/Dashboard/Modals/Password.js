import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import {
  errorHandler,
  handleAuthError,
  toastMessage,
  uploadImage,
} from "../../../helpers";
import { useSelector } from "react-redux";
function Password({ showModal, setShowModal, setShowLoader, rooms }) {
  const { token } = useSelector((state) => state.user);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  useEffect(() => {
    setNewPwd("");
    setCurrentPwd("");
    setConfirmPwd("");
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPwd.length <= 4) {
      toastMessage("info", "Password must be more than 4 characters");
    } else if (confirmPwd !== newPwd) {
      toastMessage("info", "Passwords do not match.");
    } else {
      setShowLoader(true);
      Axios.post(process.env.REACT_APP_BACKEND_URL + "/users/updatePassword/", {
        currentPwd,
        newPwd,
        token,
      })
        .then((response) => {
          setShowLoader(false);
          setShowModal(false);
          toastMessage("success", "Password has been updated successful");
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
          <Modal.Title>Change password</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group my-2">
              <input
                type="password"
                placeholder="Current password"
                className="form-control"
                required
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
              />
            </div>
            <div className="form-group my-2">
              <input
                type="password"
                placeholder="New password"
                className="form-control"
                required
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
              />
            </div>
            <div className="form-group my-2">
              <input
                type="password"
                placeholder="Confirm password"
                className="form-control"
                required
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Update Password
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default Password;
