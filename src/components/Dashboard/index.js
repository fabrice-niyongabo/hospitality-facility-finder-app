import React from "react";
import { useSelector } from "react-redux";
import Hotel from "./Hotel";

function Dashboard() {
  const { role } = useSelector((state) => state.user);
  if (role === "hotel") {
    return <Hotel />;
  } else {
    return <div>Dashboard</div>;
  }
}

export default Dashboard;
