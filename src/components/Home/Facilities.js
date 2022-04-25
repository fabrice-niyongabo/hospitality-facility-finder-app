import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import FacilitiesList from "./FacilitiesList";

function Facilities() {
  return (
    <div className="facilities-main-container">
      <div className="tabs-container mb-5">
        <ul>
          <li>All</li>
          <li>Hotels</li>
          <li>Restaurants</li>
          <li>Coffee shops</li>
        </ul>
        <div className="cart-container">
          <div className="contents">
            <HiOutlineShoppingBag color="black" size={30} />
            <div className="counter">
              <span>01</span>
            </div>
          </div>
        </div>
      </div>

      <FacilitiesList />
    </div>
  );
}

export default Facilities;
