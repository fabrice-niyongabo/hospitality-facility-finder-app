import React, { useState } from "react";
import { Skeleton } from "@mui/material";
import RoomItem from "./RoomItem";
import BookTaxi from "./BookTaxi";
import OrderItem from "./OrderItem";

function Info({
  activeTab,
  isLoading,
  results,
  errorMessage,
  fetchData,
  setShowLoader,
  token,
  setShowOrderDetailsModal,
  setOrderId,
  setRefundOrder,
  setShowRefund,
}) {
  const [showModal, setShowModal] = useState(false);
  const [facility, setFacility] = useState({});
  const [parentId, setParentId] = useState(null);
  return (
    <div>
      <h2 style={{ textTransform: "capitalize" }}>{activeTab}</h2>
      {isLoading ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Skeleton width={150} height={150} style={{ borderRadius: 10 }} />
            <div style={{ width: "100%", marginLeft: "15px" }}>
              <Skeleton
                variant="rectangular"
                height={20}
                style={{ marginBottom: 5 }}
              />
              <Skeleton
                variant="rectangular"
                height={20}
                style={{ marginBottom: 5 }}
              />
              <Skeleton
                variant="rectangular"
                height={20}
                style={{ marginBottom: 5 }}
              />
              <Skeleton variant="rectangular" height={20} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Skeleton width={150} height={150} style={{ borderRadius: 10 }} />
            <div style={{ width: "100%", marginLeft: "15px" }}>
              <Skeleton
                variant="rectangular"
                height={20}
                style={{ marginBottom: 5 }}
              />
              <Skeleton
                variant="rectangular"
                height={20}
                style={{ marginBottom: 5 }}
              />
              <Skeleton
                variant="rectangular"
                height={20}
                style={{ marginBottom: 5 }}
              />
              <Skeleton variant="rectangular" height={20} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Skeleton width={150} height={150} style={{ borderRadius: 10 }} />
            <div style={{ width: "100%", marginLeft: "15px" }}>
              <Skeleton
                variant="rectangular"
                height={20}
                style={{ marginBottom: 5 }}
              />
              <Skeleton
                variant="rectangular"
                height={20}
                style={{ marginBottom: 5 }}
              />
              <Skeleton
                variant="rectangular"
                height={20}
                style={{ marginBottom: 5 }}
              />
              <Skeleton variant="rectangular" height={20} />
            </div>
          </div>
        </>
      ) : (
        <>
          {results.length > 0 ? (
            <>
              {activeTab === "pendingOrders" ||
              activeTab === "failedOrders" ||
              activeTab === "completedOrders" ? (
                <>
                  <table className="table">
                    <tr>
                      <th>#</th>
                      <th>Transaction Id</th>
                      <th>Pickup Date</th>
                      <th>Pickup Time</th>
                      <th>Total Price</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                    <tbody>
                      {results.map((item, i) => (
                        <OrderItem
                          item={item}
                          i={i}
                          key={i}
                          setShowLoader={setShowLoader}
                          setFacility={setFacility}
                          setOrderId={setOrderId}
                          setParentId={setParentId}
                          setShowModal={setShowModal}
                          setShowOrderDetailsModal={setShowOrderDetailsModal}
                          setRefundOrder={setRefundOrder}
                          setShowRefund={setShowRefund}
                        />
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <>
                  <table className="table">
                    {results.map((item, i) => (
                      <RoomItem
                        key={i}
                        item={item}
                        fetchData={fetchData}
                        setShowLoader={setShowLoader}
                        token={token}
                        setRefundOrder={setRefundOrder}
                        setShowRefund={setShowRefund}
                      />
                    ))}
                  </table>
                </>
              )}
            </>
          ) : (
            <>
              {errorMessage !== "" ? (
                <span>{errorMessage}</span>
              ) : (
                <span>No results found.</span>
              )}
            </>
          )}
        </>
      )}
      <BookTaxi
        showModal={showModal}
        setShowModal={setShowModal}
        setShowLoader={setShowLoader}
        facility={facility}
        parentId={parentId}
      />
    </div>
  );
}

export default Info;
