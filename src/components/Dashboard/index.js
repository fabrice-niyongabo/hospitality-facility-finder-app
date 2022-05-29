import React from "react";
import { useSelector } from "react-redux";
import Hotel from "./Hotel";
import Restaurant from "./Restaurant";
import Admin from "./Admin";
import CoffeeShop from "./CoffeeShop";
import Transport from "./Transport";
function Dashboard() {
  const { role } = useSelector((state) => state.user);
  if (role === "hotel") {
    return <Hotel />;
  } else if (role === "restaurant") {
    return <Restaurant />;
  } else if (role === "admin") {
    return <Admin />;
  } else if (role === "coffeeshop") {
    return <CoffeeShop />;
  } else if (role === "transport") {
    return <Transport />;
  } else {
    window.location = "/";
    return null;
  }
}

export default Dashboard;
