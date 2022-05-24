import React from "react";
import { Spinner } from "react-bootstrap";

function Loader({ showLoader }) {
  if (showLoader) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 2000000000,
        }}
      >
        <div
          style={{
            height: "100vh",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div className="text-white">
            <Spinner animation="border" />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Loader;
