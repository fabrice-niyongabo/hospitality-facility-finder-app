import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { errorHandler, toastMessage } from "../../../helpers";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
function HotelModal({
  setShowHotelModal,
  showHotelModal,
  room,
  setShowLoader,
}) {
  const navigate = useNavigate();
  const { fullName, phone, email, token } = useSelector((state) => state.user);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const d = new Date();
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  if (month <= 9) {
    month = "0" + month;
  }
  if (day <= 9) {
    day = "0" + day;
  }
  const minDate = year + "-" + month + "-" + day;
  const calculateTotal = () => {
    return room?.price * calculateDays();
  };
  const calculateDays = () => {
    if (checkOut !== "" && checkIn !== "") {
      const cIn = new Date(checkIn);
      const cOut = new Date(checkOut);
      const difference_In_Time = cOut.getTime() - cIn.getTime();
      const diff = difference_In_Time / (1000 * 3600 * 24);
      if (diff === 0) return 1;
      return diff;
    } else {
      return 0;
    }
  };
  const config = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: calculateTotal(),
    currency: "RWF",
    payment_options: "card,mobilemoney",
    customer: {
      email,
      phonenumber: "0" + phone,
      name: fullName,
    },
    customizations: {
      title: "Hospitality Finder - Booking Checkout Page",
      description:
        "Booking " + room?.roomNumber + " for " + calculateDays() + " day(s)",
      logo: process.env.REACT_APP_PROJECT_LOGO,
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    setCheckIn("");
    setCheckOut("");
  }, []);

  const handleBooking = () => {
    if (calculateDays() <= 0) {
      toastMessage("error", "Please select valid dates");
    } else {
      setShowLoader(true);
      Axios.post(process.env.REACT_APP_BACKEND_URL + "/booking/book/", {
        checkIn,
        checkOut,
        price: room.price,
        managerId: room.managerId,
        roomId: room._id,
        token,
      })
        .then((res) => {
          // setShowLoader(false);
          // toastMessage(
          //   "success",
          //   "Booked successfull, Choose payment method to finalize booking process."
          // );
          // toastMessage(
          //   "info",
          //   "NB: if you don't pay within 1 hour, this room will be available to other clients."
          // );

          const booking = res.data.booking;

          //now checkout
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              if (response.status !== "successful") {
                toastMessage("error", "Transaction failed!");
                setShowLoader(true);
                Axios.post(
                  process.env.REACT_APP_BACKEND_URL + "/booking/cancel/",
                  {
                    id: booking._id,
                    token,
                  }
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
                  {
                    id: booking._id,
                    transactionId: response.transaction_id,
                    totalAmount: response.amount,
                    token,
                  }
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
        })
        .catch((error) => {
          setShowLoader(false);
          errorHandler(error);
        });
    }
  };
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showHotelModal}
      onHide={() => setShowHotelModal(false)}
    >
      <Modal.Header>
        <h4 className="text-dark">Booking information</h4>
      </Modal.Header>
      <Modal.Body>
        <p>Room number: {room?.roomNumber}</p>
        <p>Status: {room?.status}</p>
        <p>Price/Day: {room?.price} RWF</p>
        <div className="form-group">
          <label>Checkin Date</label>
          <input
            type="date"
            className="form-control"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={minDate}
            required
          />
        </div>
        <div className="form-group">
          <label>Checkout Date</label>
          <input
            type="date"
            className="form-control"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={minDate}
            required
          />
        </div>
        <div className="bg-light-orange p-3 mt-3" style={{ borderRadius: 5 }}>
          <h5>TOTAL DAYS: {calculateDays()}</h5>
          <h5>TOTAL PRICE: {calculateTotal()} RWF</h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShowHotelModal(false)} variant="secondary">
          Cancel
        </Button>
        &nbsp; &nbsp;
        <button
          type="submit"
          className="btn bg-orange text-white"
          onClick={() => handleBooking()}
        >
          Checkout
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default HotelModal;
