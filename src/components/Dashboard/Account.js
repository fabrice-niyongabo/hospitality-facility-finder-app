import React from "react";
import { useSelector } from "react-redux";
import MyAccount from "../Dashboard/Hotel/MyAccount";
import RestoAccount from "../Dashboard/Restaurant/Account";
import CoffeeShopAccount from "../Dashboard/CoffeeShop/Account";

function Account() {
  const { role } = useSelector((state) => state.user);
  if (role === "hotel") {
    return <MyAccount />;
  }
  if (role === "restaurant") {
    return <RestoAccount />;
  }
  if (role === "coffeeshop") {
    return <CoffeeShopAccount />;
  }
  return null;
}

export default Account;
