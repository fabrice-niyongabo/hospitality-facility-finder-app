import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "../Hotel/SideBar";
import RestoSideBar from "../Restaurant/SideBar";
import CoffeeShopSideBar from "../CoffeeShop/SideBar";
import Contents from "./Contents";
import Loader from "../Modals/Loader";

function Description() {
  const [showLoader, setShowLoader] = useState(true);
  const userObj = useSelector((state) => state.user);
  return (
    <div className="body">
      <div className="dashoard-main-container">
        <div className="sidebar">
          {userObj.role === "hotel" && <SideBar activate="description" />}
          {userObj.role === "restaurant" && (
            <RestoSideBar activate="description" />
          )}
          {userObj.role === "coffeeshop" && (
            <CoffeeShopSideBar activate="description" />
          )}
        </div>
        <div className="contents">
          <Contents setShowLoader={setShowLoader} />
        </div>
      </div>
      <Loader showLoader={showLoader} />
    </div>
  );
}

export default Description;
