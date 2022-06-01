import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import {
  calCulateDistance,
  errorHandler,
  fetchCoordinates,
  toastMessage,
} from "../../helpers";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function BookTaxi({ showModal, setShowModal, facility, setShowLoader }) {
  const navigate = useNavigate();
  const { fullName, phone, email, token } = useSelector((state) => state.user);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const config = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount:
      calCulateDistance(lat, long, facility.lat, facility.long).toFixed(1) *
      1500,
    currency: "RWF",
    payment_options: "card,mobilemoney",
    customer: {
      email,
      phonenumber: "0" + phone,
      name: fullName,
    },
    customizations: {
      title: "Hospitality Finder - Taxi Booking Checkout Page",
      description: "Booking taxi to go at " + facility.name,
      logo: process.env.REACT_APP_PROJECT_LOGO,
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    setErrorMessage("");
    fetchCoordinates()
      .then((res) => {
        setLat(res.lat);
        setLong(res.long);
      })
      .catch((error) => {
        console.log("errr", error);
        setLat("");
        setLat("");
        setErrorMessage(
          "Failed to get your current location. This is because you have not granted us permision to get your current loaction or the location is turned off on you device. Please fix this issue an try again later."
        );
      });
  }, [showModal]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const totalAmount =
      calCulateDistance(lat, long, facility.lat, facility.long).toFixed(1) *
      1500;
    if (totalAmount !== NaN && totalAmount > 0) {
      setErrorMessage("");
      setShowLoader(true);
      handleFlutterPayment({
        callback: (response) => {
          console.log(response);
          if (response.status !== "successful") {
            toastMessage("error", "Transaction failed!");
            Axios.post(
              process.env.REACT_APP_BACKEND_URL + "/booking/cancel/",
              {}
            )
              .then((res) => {
                toastMessage("info", res.data.msg);
                navigate("/profile/failedBookings");
              })
              .catch((error) => {
                errorHandler(error);
              });
          } else {
            closePaymentModal();
            toastMessage("success", "Transaction paid successfull!");
            setShowLoader(true);
            Axios.post(
              process.env.REACT_APP_BACKEND_URL + "/booking/approve/",
              {}
            )
              .then((res) => {
                toastMessage("success", res.data.msg);
                navigate("/profile/completedBookings");
              })
              .catch((error) => {
                errorHandler(error);
              });
          }
        },
        onClose: () => {
          setShowLoader(false);
        },
      });
    } else {
      setErrorMessage(
        "Failed to get your current location. This is because you have not granted us permision to get your current loaction or the location is turned off on you device. Please fix this issue an try again later."
      );
    }
  };
  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Book Taxi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {errorMessage !== "" && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div className="form-group">
              <label>Departure time</label>
              <input type="date" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Driver language</label>
              <select className="form-control" required>
                <option value=""></option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Kinyarwanda">Kinyarwanda</option>
              </select>
            </div>
            <div className="form-group mt-2">
              <p>
                TOTAL KM:{" "}
                {calCulateDistance(
                  lat,
                  long,
                  facility.lat,
                  facility.long
                ).toFixed(1)}
              </p>
              <p>
                TOTAL PRICE:{" "}
                {calCulateDistance(
                  lat,
                  long,
                  facility.lat,
                  facility.long
                ).toFixed(1) * 1500}{" "}
                RWF /{" "}
                {(calCulateDistance(
                  lat,
                  long,
                  facility.lat,
                  facility.long
                ).toFixed(1) *
                  1500) /
                  1000}{" "}
                USD
              </p>
              <button className="text-white bg-orange btn">Pay Now</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BookTaxi;
