import { Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HiOutlineShoppingBag } from "react-icons/hi";
import FacilitySkeleton from "../Home/FacilitySkeleton";
import RestaurantMenuItem from "./RestaurantMenuItem";

import Axios from "axios";
import Loader from "../Dashboard/Modals/Loader";
import { useSelector } from "react-redux";
function Restaurant({ id, restoName }) {
  const { cart } = useSelector((state) => state.cart);
  const [menus, setMenus] = useState([]);
  const [isLoadingMenus, setIsLoadingMenus] = useState(true);
  const [menuError, setMenuError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showLoader, setShowLoader] = useState(false);

  const fetchMenus = () => {
    setIsLoadingMenus(true);
    setMenuError("");
    Axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/restaurant/menus/" +
        id +
        "/" +
        activeTab
    )
      .then((res) => {
        setIsLoadingMenus(false);
        setMenus(res.data.result);
      })
      .catch((error) => {
        setIsLoadingMenus(false);
        setMenuError(error.message);
      });
  };
  useEffect(() => {
    fetchMenus();
  }, [activeTab]);
  return (
    <>
      <div className="text-center mt-5 pt-4">
        <h1 className="quicksand-font text-orange">Explore our menu</h1>
      </div>
      <div
        className="facilities-main-container"
        style={{ margin: "0px 5rem", border: "none" }}
      >
        <div className="tabs-container mb-0">
          <ul>
            <li
              className={activeTab == "" || activeTab == "all" ? "active" : ""}
              onClick={() => setActiveTab("all")}
            >
              All
            </li>
            <li
              className={activeTab == "Main dishes" ? "active" : ""}
              onClick={() => setActiveTab("Main dishes")}
            >
              Main dishes
            </li>
            <li
              className={activeTab == "Snaks" ? "active" : ""}
              onClick={() => setActiveTab("Snaks")}
            >
              Snaks
            </li>
            <li
              className={activeTab == "Drinks" ? "active" : ""}
              onClick={() => setActiveTab("Drinks")}
            >
              Drinks
            </li>
          </ul>
          <a href="/cart">
            <div className="cart-container">
              <div className="contents">
                <HiOutlineShoppingBag color="black" size={30} />
                <div className="counter">
                  <span>{cart.length}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className=" mx-5 px-4">
        {isLoadingMenus ? (
          <>
            <FacilitySkeleton />
          </>
        ) : (
          <>
            {menus.length > 0 ? (
              <div className="row">
                {menus.map((item, i) => (
                  <RestaurantMenuItem
                    key={i}
                    item={item}
                    setShowLoader={setShowLoader}
                    restoName={restoName}
                  />
                ))}
              </div>
            ) : (
              <div className="mb-5 text-center">
                {menuError === "" ? (
                  "No " + activeTab + " found"
                ) : (
                  <>{menuError}</>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <Loader showLoader={showLoader} />
    </>
  );
}

export default Restaurant;
