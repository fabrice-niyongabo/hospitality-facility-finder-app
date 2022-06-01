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
import { amountPerKilometer } from "../../constansts/";
import {
  BsFillCheckCircleFill,
  BsFillExclamationTriangleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
function BookTaxi({
  showModal,
  setShowModal,
  facility,
  setShowLoader,
  parentId,
}) {
  const navigate = useNavigate();
  const { fullName, phone, email, token } = useSelector((state) => state.user);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [time, setTime] = useState("");
  const [language, setLanguage] = useState("");
  const [processStatus, setProcessStatus] = useState("");
  const [paymentId, setPaymentId] = useState("111");
  const [result, setResult] = useState(null);

  const config = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount:
      calCulateDistance(lat, long, facility.lat, facility.long).toFixed(1) *
      amountPerKilometer,
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
      amountPerKilometer;
    if (totalAmount !== NaN && totalAmount > 0) {
      setErrorMessage("");
      setShowLoader(true);
      handleFlutterPayment({
        callback: (response) => {
          console.log(response);
          if (response.status !== "successful") {
            toastMessage("error", "Transaction failed!");
            setShowLoader(false);
            setProcessStatus("failed");
          } else {
            closePaymentModal();
            setShowLoader(true);
            toastMessage("success", "Transaction paid successfull!");
            setShowLoader(true);
            Axios.post(process.env.REACT_APP_BACKEND_URL + "/transport/book/", {
              km: calCulateDistance(
                lat,
                long,
                facility.lat,
                facility.long
              ).toFixed(1),
              departureTime: time,
              transactionId: response.transaction_id,
              driverLanguage: language,
              pt: parentId,
              type: "orders",
              amount: response.amount,
              token,
            })
              .then((res) => {
                toastMessage("info", res.data.msg);
                setResult(res.data.result);
                setProcessStatus("completed");
              })
              .catch((error) => {
                errorHandler(error);
                setProcessStatus("failed");
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
          {processStatus === "" ? (
            <>
              <form onSubmit={handleSubmit}>
                {errorMessage !== "" && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <div className="form-group">
                  <label>Departure time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Driver language</label>
                  <select
                    className="form-select"
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                    }}
                    required
                  >
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
            </>
          ) : (
            <>
              {processStatus === "completed" ? (
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    display: "flex",
                  }}
                  className="mb-3"
                >
                  <BsFillCheckCircleFill color="green" size={50} />
                  <h3>THANK YOU!</h3>
                  <p className="p-0 m-0">
                    YOUR DRIVER PAYMENT ID IS: <b>{result?.paymentId}</b>
                  </p>
                  <p className="text-center">
                    <b>
                      REMEMBER TO KEEP YOUR DRIVER PAYMENT ID SO THAT YOU CAN
                      GIVE IT TO A DRIVER WHO DROVE YOU INORDER TO COMPLETE THE
                      PROCESS
                    </b>
                  </p>
                  <button
                    className="btn bg-orange text-white"
                    onClick={() =>
                      window.open(
                        process.env.REACT_APP_URL +
                          "/print/customerTransportId/" +
                          result?._id,
                        "Print",
                        "width:100"
                      )
                    }
                  >
                    PRINT YOUR TICKET
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    display: "flex",
                  }}
                  className="mb-3"
                >
                  <BsFillExclamationTriangleFill color="red" size={50} />
                  <p className="p-0 m-2 text-danger">
                    Transaction failed, please try again later.
                  </p>
                </div>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BookTaxi;
