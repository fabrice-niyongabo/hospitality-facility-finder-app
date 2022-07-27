import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { errorHandler, toastMessage } from "../../../helpers";
import { useSelector } from "react-redux";
function Refund({ showModal, setShowModal, setShowLoader, refundOrder }) {
  const { token } = useSelector((state) => state.user);
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (reason.trim() !== "" && refundOrder !== null) {
      setShowLoader(true);
      Axios.post(process.env.REACT_APP_BACKEND_URL + "/refunds/request", {
        token,
        description: reason,
        orderId: refundOrder._id,
        orderType: refundOrder?.roomId ? "room" : "menu",
      })
        .then((res) => {
          setShowLoader(false);
          toastMessage("success", res.data.msg);
          setShowModal(false);
        })
        .catch((error) => {
          errorHandler(error);
          setShowLoader(false);
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
          <Modal.Title>Refund form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {refundOrder && (
            <>
              <p>
                Please provide the reason why you want your money back. Admin
                will prove your request based on the reason you provide.
              </p>
              <div className="form-group my-2">
                <textarea
                  type="text"
                  placeholder="Description"
                  className="form-control"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                ></textarea>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Refund;
