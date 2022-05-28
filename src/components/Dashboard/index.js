import React from "react";
import { useSelector } from "react-redux";
import Hotel from "./Hotel";
import Restaurant from "./Restaurant";
import Admin from "./Admin";
import { useNavigate } from "react-router-dom";
import CoffeeShop from "./CoffeeShop";
function Dashboard() {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.user);
  if (role === "hotel") {
    return <Hotel />;
  } else if (role === "restaurant") {
    return <Restaurant />;
  } else if (role === "admin") {
    return <Admin />;
  } else if (role === "coffeeshop") {
    return <CoffeeShop />;
  } else {
    navigate("/");
    return null;
  }
}

export default Dashboard;
