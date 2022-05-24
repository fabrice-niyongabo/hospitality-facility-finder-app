import React from "react";
import { useSelector } from "react-redux";
import Hotel from "./Hotel";
import Restaurant from "./Restaurant";
import Admin from "./Admin";
function Dashboard() {
  const { role } = useSelector((state) => state.user);
  if (role === "hotel") {
    return <Hotel />;
  } else if (role === "restaurant") {
    return <Restaurant />;
  } else if (role === "admin") {
    return <Admin />;
  } else {
    window.location = "/";
    return null;
  }
}

export default Dashboard;
