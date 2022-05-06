import React from "react";
import { useSelector } from "react-redux";
import Hotel from "./Hotel";
import Restaurant from "./Restaurant";

function Dashboard() {
  const { role } = useSelector((state) => state.user);
  if (role === "hotel") {
    return <Hotel />;
  } else if (role === "restaurant") {
    return <Restaurant />;
  } else {
    return <div>Dashboard</div>;
  }
}

export default Dashboard;
