import React, { useEffect, useState } from "react";
import { FaEye, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";
import Axios from "axios";
import AddRestaurantItem from "../Modals/AddRestaurantItem";
import Loader from "../Modals/Loader";
import { handleAuthError } from "../../../helpers";

function Restaurant() {
  const userObj = useSelector((state) => state.user);
  const [itemsList, setItemsList] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchItemLists = () => {
    Axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/restaurant/item/all/?token=" +
        userObj.token
    )
      .then((res) => {
        setShowLoader(false);
        setItemsList(res.data.result);
      })
      .catch((error) => {
        handleAuthError(error);
        setItemsList([]);
        setShowLoader(false);
      });
  };
  useEffect(() => {
    fetchItemLists();
  }, []);
  return (
    <div className="body">
      <div className="dashoard-main-container">
        <div className="sidebar">
          <SideBar activate="dashboard" />
        </div>
        <div className="contents">
          <div className="contents-header">
            <div className="title">
              <FaHome color="black" size={30} />
              <span> Restaurant Manager Dashboard</span>
            </div>
            <div className="company">{userObj.companyName}</div>
          </div>
          <div className="main-contents-container" style={{ padding: "1rem" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: 10,
              }}
            >
              <div className="mb-3">
                <button
                  style={{ padding: "5px 15px", borderRadius: 5 }}
                  className="orange-border bg-white"
                  onClick={() => setShowModal(true)}
                >
                  ADD NEW ITEM
                </button>
                &nbsp;
                <button
                  style={{ padding: "5px 15px", borderRadius: 5 }}
                  className="orange-border bg-white"
                >
                  DELETE SELECTED ITEMS
                </button>
              </div>
              {itemsList.length > 0 ? (
                <>
                  <table className="w-100">
                    <thead className="bg-light-orange">
                      <th className="p-2">
                        <input type="checkbox" />
                      </th>
                      <th className="p-2">Item ID</th>
                      <th className="p-2">Item Name</th>
                      <th className="p-2">Item Category</th>
                      <th className="p-2">Item Price</th>
                      <th className="p-2">Item Quantity</th>
                      <th></th>
                    </thead>
                    <tbody>
                      {itemsList.map((item, i) => (
                        <tr key={i}>
                          <td className="p-2">
                            <input type="checkbox" />
                          </td>
                          <td className="p-2">#{i + 1}</td>
                          <td className="p-2">{item.menuName}</td>
                          <td className="p-2">{item.category}</td>
                          <td className="p-2">{item.price} RWF</td>
                          <td className="p-2">{item.quantity}</td>
                          <td className="p-2">
                            <button className="btn bg-orange text-white">
                              <FaEye size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <p>No items found</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Loader showLoader={showLoader} />
      <AddRestaurantItem
        setShowLoader={setShowLoader}
        showModal={showModal}
        setShowModal={setShowModal}
        itemsList={itemsList}
        setItemsList={setItemsList}
      />
    </div>
  );
}

export default Restaurant;
