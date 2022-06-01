import React, { useState } from "react";
import { Skeleton } from "@mui/material";
import RoomItem from "./RoomItem";
import BookTaxi from "./BookTaxi";

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
                        <>
                          <tr>
                            <td>{i + 1}</td>
                            {item.status === "paid" ? (
                              <td>{item.transactionId}</td>
                            ) : (
                              <td>-</td>
                            )}
                            <td>{item.pickupDate}</td>
                            <td>{item.pickupTime}</td>
                            <td>{item.totalAmount} RWF</td>
                            <td>
                              {new Date(item.date).getDate()}-
                              {new Date(item.date).getMonth() + 1}-
                              {new Date(item.date).getFullYear()}
                            </td>
                            {item.status === "failed" ? (
                              <td
                                className="text-danger"
                                style={{ textTransform: "capitalize" }}
                              >
                                {item.status}
                              </td>
                            ) : (
                              <td
                                className="text-info"
                                style={{ textTransform: "capitalize" }}
                              >
                                {item.status}
                              </td>
                            )}
                            <td>
                              <button
                                onClick={() => {
                                  setOrderId(item._id);
                                  setShowOrderDetailsModal(true);
                                }}
                                className="btn bg-orange text-white"
                              >
                                More...
                              </button>
                            </td>
                            {item.status === "paid" && (
                              <td>
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
                              </td>
                            )}
                          </tr>
                        </>
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
