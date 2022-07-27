import React from "react";

import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { errorHandler, toastMessage } from "../../helpers";
function OrderItem({
  item,
  i,
  setOrderId,
  setShowOrderDetailsModal,
  setShowModal,
  setShowLoader,
  setParentId,
  setFacility,
  setRefundOrder,
}) {
  const { fullName, phone, email, token, id } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const config = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: item.totalAmount,
    currency: "RWF",
    payment_options: "card,mobilemoney",
    customer: {
      email,
      phonenumber: "0" + phone,
      name: fullName,
    },
    customizations: {
      title: "Hospitality Finder - Order Checkout Page",
      description: "Paying a failed transaction",
      logo: process.env.REACT_APP_PROJECT_LOGO,
    },
  };
  const handleFlutterPayment = useFlutterwave(config);
  const handleCheckout = () => {
    setShowLoader(true);
    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        setShowLoader(false);
        if (response.status !== "successful") {
          toastMessage("Error", "Transaction failed!");
        } else {
          closePaymentModal();
          toastMessage("success", "Transaction paid successfull!");
          setShowLoader(true);
          Axios.post(
            process.env.REACT_APP_BACKEND_URL + "/cart/completedOrder2/",
            {
              i: item._id,
              totalAmount: response.amount,
              transactionId: response.transaction_id,
              token,
            }
          )
            .then((res) => {
              toastMessage("success", res.data.msg);
              navigate("/profile/completedOrders");
              window.location.reload();
            })
            .catch((error) => {
              setShowLoader(false);
              errorHandler(error);
            });
        }
      },
      onClose: () => {
        setShowLoader(false);
      },
    });
  };
  return (
    <>
      <tr>
        <td>{i + 1}</td>
        {item.status === "paid" ? <td>{item.transactionId}</td> : <td>-</td>}
        <td>{item.pickupDate}</td>
        <td>{item.pickupTime}</td>
        <td>{item.totalAmount} RWF</td>
        <td>
          {new Date(item.date).getDate()}-{new Date(item.date).getMonth() + 1}-
          {new Date(item.date).getFullYear()}
        </td>
        {item.status === "failed" ? (
          <td className="text-danger" style={{ textTransform: "capitalize" }}>
            {item.status}
          </td>
        ) : (
          <td className="text-info" style={{ textTransform: "capitalize" }}>
            {item.status}
          </td>
        )}
        <td>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <button
              onClick={() => {
                setOrderId(item._id);
                setShowOrderDetailsModal(true);
              }}
              className="btn bg-orange text-white"
            >
              More...
            </button>
            {item.status === "failed" && (
              <>
                &nbsp;&nbsp;
                <button
                  onClick={() => {
                    handleCheckout();
                  }}
                  className="btn bg-orange text-white"
                >
                  Pay now
                </button>
              </>
            )}
          </div>
        </td>
        {item.status === "paid" && (
          <td>
            {item.transport === null ? (
              <button
                onClick={() => {
                  setFacility(item.facility);
                  setParentId(item._id);
                  setShowModal(true);
                }}
                className="btn bg-orange text-white"
              >
                Book Taxi
              </button>
            ) : (
              <button
                onClick={() => {
                  window.open(
                    process.env.REACT_APP_URL +
                      "/print/customerTransportId/" +
                      item.transport._id,
                    "Print",
                    "width:100"
                  );
                }}
                className="btn bg-orange text-white"
              >
                View Booked Taxi
              </button>
            )}

            <p>Refund</p>
          </td>
        )}
      </tr>
    </>
  );
}

export default OrderItem;
