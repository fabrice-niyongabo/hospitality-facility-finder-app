import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Axios from "axios";
import { errorHandler, handleAuthError } from "../../../helpers";

function PaymentItem({ item, i, setTx, activeTab, setShowModal }) {
  const { token } = useSelector((state) => state.user);
  const [isChecking, setIsChecking] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [transferStatus, setTransferStatus] = useState("");
  useEffect(() => {
    setTransferStatus(item.transfered);
    if (item.transfered === "Pending") {
      handleChecking();
    }
  }, []);

  const handleChecking = () => {
    setIsChecking(true);
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/transfers/check/", {
      tId: item.transferId,
      type: item.transportationManagerId ? "transport" : item.facility[0]?.type,
      id: item._id,
      token,
    })
      .then((res) => {
        setTransferStatus(res.data.status);
        setIsChecking(false);
      })
      .catch((error) => {
        setIsChecking(false);
        handleAuthError(error);
      });
  };

  const handleRetry = () => {
    setIsRetrying(true);
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/transfers/retry/", {
      tId: item.transferId,
      type: item.transportationManagerId ? "transport" : item.facility[0]?.type,
      id: item._id,
      token,
    })
      .then((res) => {
        setTransferStatus(res.data.status);
        setIsRetrying(false);
      })
      .catch((error) => {
        setIsRetrying(false);
        errorHandler(error);
      });
  };
  return (
    <tr style={{ borderTopColor: "#CCC", borderTopWidth: 1 }}>
      <td className="p-2">{i + 1}</td>
      <td className="p-2">{item.transactionId}</td>
      <td className="p-2">
        {activeTab === "orders" && <>{item.totalAmount}</>}
        {activeTab === "bookings" && (
          <>
            {item.paymentStatus === "paid" ? (
              <>{item.totalAmount}</>
            ) : (
              <>{item.totalDays * item.pricePerDay}</>
            )}
          </>
        )}
        {activeTab === "transport" && <>{item.amountPaid}</>}
        RWF
      </td>
      <td className="p-2">
        {activeTab === "orders" && (
          <>
            {item.status === "paid" ? (
              <>{(item.totalAmount * 7) / 100} RWF</>
            ) : (
              <>-</>
            )}
          </>
        )}
        {activeTab === "bookings" && (
          <>
            {item.paymentStatus === "paid" ? (
              <>{(item.totalAmount * 7) / 100} RWF</>
            ) : (
              <>-</>
            )}
          </>
        )}
        {activeTab === "transport" && (
          <>
            {item.status === "paid" ? (
              <>{(item.amountPaid * 7) / 100} RWF</>
            ) : (
              <>-</>
            )}
          </>
        )}
      </td>
      <td className="p-2">
        {activeTab === "orders" && (
          <>
            {item.status === "paid" ? (
              <>{(item.totalAmount * 93) / 100} RWF</>
            ) : (
              <>-</>
            )}
          </>
        )}
        {activeTab === "bookings" && (
          <>
            {item.paymentStatus === "paid" ? (
              <>{(item.totalAmount * 93) / 100} RWF</>
            ) : (
              <>-</>
            )}
          </>
        )}
        {activeTab === "transport" && (
          <>
            {item.status === "paid" ? (
              <>{(item.amountPaid * 93) / 100} RWF</>
            ) : (
              <>-</>
            )}
          </>
        )}
      </td>
      <td>{item.customer[0].fullName}</td>
      <td className="p-2">{item.facility[0].name}</td>
      <td className="p-2" style={{ textTransform: "capitalize" }}>
        {item.facility[0].type}
      </td>
      <td className="p-2">
        {activeTab === "orders" || activeTab === "transport" ? (
          <>
            {new Date(item.date).getDate()}-{new Date(item.date).getMonth() + 1}
            -{new Date(item.date).getFullYear() + 1}
          </>
        ) : (
          <>
            {new Date(item.transactionDate).getDate()}-
            {new Date(item.transactionDate).getMonth() + 1}-
            {new Date(item.transactionDate).getFullYear() + 1}
          </>
        )}
      </td>
      <td className="p-2" style={{ textTransform: "capitalize" }}>
        {item?.status === "paid" || item?.paymentStatus === "paid" ? (
          <>
            {isChecking || isRetrying ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>
                {item.transfered == "No" || item.transfered == "false" ? (
                  <button
                    className="btn"
                    onClick={() => {
                      setTx(item);
                      setShowModal(true);
                    }}
                    title="Click to transfer"
                  >
                    {item.transfered}
                  </button>
                ) : (
                  <>
                    {transferStatus == "Failed" ? (
                      <button
                        className="btn"
                        title="Click to retry transfer"
                        onClick={() => handleRetry()}
                      >
                        {transferStatus}
                      </button>
                    ) : (
                      <>
                        {transferStatus === "Check Again" ? (
                          <button
                            className="btn"
                            title="Click to check transfer status again"
                            onClick={() => handleChecking()}
                          >
                            {transferStatus}
                          </button>
                        ) : (
                          <>{transferStatus}</>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>NO</>
        )}
      </td>
      {(activeTab === "orders" || activeTab === "transport") && (
        <>
          {item.status === "failed" && (
            <td
              className="p-2 text-danger"
              style={{ textTransform: "capitalize" }}
            >
              {item.status}
            </td>
          )}
          {item.status === "pending" && (
            <td
              className="p-2 text-info"
              style={{ textTransform: "capitalize" }}
            >
              {item.status}
            </td>
          )}
          {item.status === "paid" && (
            <td
              className="p-2 text-success"
              style={{ textTransform: "capitalize" }}
            >
              {item.status}
            </td>
          )}
        </>
      )}
      {activeTab === "bookings" && (
        <>
          {item.paymentStatus === "failed" && (
            <td
              className="p-2 text-danger"
              style={{ textTransform: "capitalize" }}
            >
              {item.paymentStatus}
            </td>
          )}
          {item.paymentStatus === "pending" && (
            <td
              className="p-2 text-info"
              style={{ textTransform: "capitalize" }}
            >
              {item.paymentStatus}
            </td>
          )}
          {item.paymentStatus === "paid" && (
            <td
              className="p-2 text-success"
              style={{ textTransform: "capitalize" }}
            >
              {item.paymentStatus}
            </td>
          )}
        </>
      )}
      {activeTab === "transport" && (
        <>
          {item.status === "failed" && (
            <td
              className={
                item.status === "paid"
                  ? "p-2 text-danger text-success"
                  : "p-2 text-danger text-danger"
              }
              style={{ textTransform: "capitalize" }}
            >
              {item.status}
            </td>
          )}
        </>
      )}
    </tr>
  );
}

export default PaymentItem;
