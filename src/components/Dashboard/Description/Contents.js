import React from "react";
import { useSelector } from "react-redux";
import CoffeeShop from "./CoffeeShop";
import Hotel from "./Hotel";
import Restaurant from "./Restaurant";
function Contents({ setShowLoader }) {
  const user = useSelector((state) => state.user);
  if (user.role === "hotel") {
    return <Hotel setShowLoader={setShowLoader} user={user} />;
  } else if (user.role === "restaurant") {
    return <Restaurant setShowLoader={setShowLoader} user={user} />;
  } else if (user.role === "coffeeshop") {
    return <CoffeeShop setShowLoader={setShowLoader} user={user} />;
  } else {
    return null;
  }
}

export default Contents;
