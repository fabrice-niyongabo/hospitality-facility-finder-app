import { Skeleton } from "@mui/material";
import React from "react";
import RoomItem from "./RoomItem";

function Info({
  activeTab,
  isLoading,
  results,
  errorMessage,
  fetchData,
  setShowLoader,
  token,
}) {
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
                <></>
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
    </div>
  );
}

export default Info;
