import React from "react";

function PlaceHolder() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        flexDirection: "column",
      }}
    >
      <img src={require("../../assets/loader.gif")} style={{ width: 100 }} />
      <p>Loading, please wait...</p>
    </div>
  );
}

export default PlaceHolder;
