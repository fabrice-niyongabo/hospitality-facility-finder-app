import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BsCheck2Circle } from "react-icons/bs";
import { errorHandler, toastMessage } from "../../helpers";
import { Skeleton } from "@mui/material";
import BookTaxi from "./BookTaxi";
function RoomItem({
  item,
  token,
  fetchData,
  setShowLoader,
  setRefundOrder,
  setShowRefund,
}) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [facility, setFacility] = useState({});
  const [parentId, setParentId] = useState(null);
  useEffect(() => {
    setLoading(true);
    Axios.get(process.env.REACT_APP_BACKEND_URL + "/rooms/find/" + item.roomId)
      .then((res) => {
        setLoading(false);
        setResult(res.data.result);
      })
      .catch((error) => {
        // setLoading(false);
        console.log(error);
      });
  }, []);

  const showRefund = (date) => {
    const currentDate = new Date();
    const transactionDate = new Date(date);
    if (currentDate.getHours() === transactionDate.getHours()) {
      if (currentDate.getMinutes() - transactionDate.getMinutes() <= 30) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleCancel = () => {
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/booking/cancel/", {
      id: item._id,
      token,
    })
      .then((res) => {
        toastMessage("info", res.data.msg);
        setShowLoader(false);
        fetchData();
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  };
  return (
    <>
      <tr>
        <td>
          {loading ? (
            <div>
              <Skeleton
                variant="rectangular"
                style={{
                  width: 300,
                  height: 250,
                  borderRadius: 20,
                }}
              />
            </div>
          ) : (
            <img
              alt={item.roomNumber}
              src={process.env.REACT_APP_BACKEND_FILE_URL + result?.image}
              style={{
                width: 300,
                height: 250,
                borderRadius: 20,
              }}
            />
          )}
        </td>
        <td className="roboto-font">
          <h3 className="m-0 px-0">{result?.roomNumber}</h3>
          <p className="px-0">{result?.description}</p>
          <p className="m-0 p-0">Check in date: {item.checkinDate}</p>
          <p className="m-0 p-0">Check out date: {item.checkoutDate}</p>
          <p className="m-0 p-0" style={{ fontWeight: 700 }}>
            Transaction ID: {item.transactionId}
          </p>
          <p className="m-0 p-0" style={{ fontWeight: 700 }}>
            Transaction date&time:
            {new Date(item.transactionDate).getFullYear()}-
            {new Date(item.transactionDate).getMonth() + 1}-
            {new Date(item.transactionDate).getDate()}&nbsp;&nbsp;
            {new Date(item.transactionDate).getHours()}:
            {new Date(item.transactionDate).getMinutes()}
          </p>
        </td>
        <td>
          <p className="text-orange m-0 p-0">Price: {item.pricePerDay} RWF</p>
          <p className="text-orange m-0 p-0">Total days: {item.totalDays}</p>
          <p className="text-orange m-0 p-0">
            Total price: {item.totalDays * item.pricePerDay} RWF
          </p>
          {item.paymentStatus === "paid" && (
            <p className="text-orange m-0 p-0">
              Transaction ID: {item.transactionId}
            </p>
          )}
          {item.paymentStatus === "paid" && (
            <>
              {item.transport === null ? (
                <button
                  className="btn bg-orange text-white mt-2"
                  onClick={() => {
                    setFacility(item.facility);
                    setParentId(item._id);
                    setShowModal(true);
                  }}
                >
                  Book Taxi
                </button>
              ) : (
                <button
                  className="btn bg-orange text-white mt-2"
                  onClick={() => {
                    window.open(
                      process.env.REACT_APP_URL +
                        "/print/customerTransportId/" +
                        item.transport._id,
                      "Print",
                      "width:100"
                    );
                  }}
                >
                  View Booked Taxi
                </button>
              )}
            </>
          )}

          {showRefund(item.transactionDate) && (
            <p
              className="text-success"
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                setRefundOrder(item);
                setShowRefund(true);
              }}
            >
              Claim for Refund
            </p>
          )}
        </td>
        <td>
          {item.paymentStatus === "pending" ? (
            <>
              <button className="btn bg-orange text-white d-block mb-3">
                Pay Now
              </button>
              <button
                onClick={handleCancel}
                className="btn bg-orange text-white d-block"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {item.paymentStatus === "paid" ? (
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <BsCheck2Circle color="#f46a06" size={50} />
                  <p className="h4 text-orange">Paid</p>
                </div>
              ) : (
                <>
                  <div className="alert alert-danger text-center">
                    <h4>Failed/canceled</h4>
                  </div>
                  {/* <button className="btn bg-orange text-white d-block mb-3">
                  Checkout
                </button> */}
                </>
              )}
            </>
          )}
        </td>
      </tr>
      <BookTaxi
        showModal={showModal}
        setShowModal={setShowModal}
        setShowLoader={setShowLoader}
        facility={facility}
        parentId={parentId}
      />
    </>
  );
}

export default RoomItem;
