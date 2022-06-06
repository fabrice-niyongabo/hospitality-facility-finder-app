import React, { useState } from "react";
import "../../styles/confirmTransport.scss";
import { Spinner } from "react-bootstrap";
import Axios from "axios";
import { toastMessage } from "../../helpers";
function ConfirmTransport() {
  const [driverId, setDriverId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/transport/confirm", {
      driverId,
      paymentId,
    })
      .then((res) => {
        setIsSubmitting(false);
        setDriverId("");
        setPaymentId("");
        toastMessage("success", res.data.msg);
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (error?.response?.data?.msg) {
          toastMessage("error", error.response.data.msg);
        } else {
          toastMessage("error", error.message);
        }
      });
  };
  return (
    <div className="main-container">
      <div className="contents-container">
        <div className="main-contents">
          <h3>Confirm Journey</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Driver ID</label>
              <input
                type="text"
                className="form-control"
                disabled={isSubmitting}
                required={true}
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Payment ID</label>
              <input
                type="number"
                className="form-control"
                disabled={isSubmitting}
                required={true}
                value={paymentId}
                onChange={(e) => setPaymentId(e.target.value)}
              />
            </div>
            <button className="btn mt-3" type="submit" disabled={isSubmitting}>
              {isSubmitting && <Spinner animation="border" size="sm" />} Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmTransport;
