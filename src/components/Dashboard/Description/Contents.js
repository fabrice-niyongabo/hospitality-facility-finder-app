import React from "react";
import { useSelector } from "react-redux";
import CoffeeShop from "./CoffeeShop";
import Hotel from "./Hotel";
import Restaurant from "./Restaurant";
function Contents() {
  const user = useSelector((state) => state.user);
  if (user.role === "hotel") {
    return <Hotel user={user} />;
  } else if (user.role === "restaurant") {
    return <Restaurant user={user} />;
  } else if (user.role === "coffeeshop") {
    return <CoffeeShop user={user} />;
  } else {
    return null;
  }
}

export default Contents;
