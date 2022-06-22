import React, { useEffect, useState } from "react";
import { FaEye, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../../../styles/hotel.dashboard.scss";
import SideBar from "./SideBar";
import Axios from "axios";
import AddDriver from "../Modals/AddDriver";
import Loader from "../Modals/Loader";
import { errorHandler, handleAuthError, toastMessage } from "../../../helpers";
import ViewRestaurantItem from "../Modals/ViewRestaurantItem";
import Confirm from "../Modals/Confirm";
import { Link } from "react-router-dom";
function Drivers() {
  const userObj = useSelector((state) => state.user);
  const [itemsList, setItemsList] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewItem, setPreviewItem] = useState({});
  const [checkedList, setCheckedList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const fetchItemLists = () => {
    Axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/drivers/find/?token=" +
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
    setCheckedList([]);
  }, []);

  const handleSelectAll = (checked) => {
    if (checked) {
      setCheckedList(itemsList.map((item) => item._id));
    } else {
      setCheckedList([]);
    }
  };

  const handleCheck = (checked, id) => {
    if (checked) {
      if (!checkedList.includes(id)) {
        setCheckedList([...checkedList, id]);
      }
    } else {
      setCheckedList(checkedList.filter((item) => item != id));
    }
  };

  const handleDelete = () => {
    if (checkedList.length > 0) {
      setShowLoader(true);
      Axios.post(process.env.REACT_APP_BACKEND_URL + "/drivers/remove/", {
        token: userObj.token,
        items: checkedList,
      })
        .then((res) => {
          setShowLoader(false);
          toastMessage(
            "success",
            "Drivers selected has been deleted successful!"
          );
          setItemsList(
            itemsList.filter((item) => !checkedList.includes(item._id))
          );
          setCheckedList([]);
        })
        .catch((error) => {
          setShowLoader(false);
          errorHandler(error);
        });
    } else {
      toastMessage("info", "No items selected.");
    }
  };
  return (
    <div className="body">
      <div className="dashoard-main-container">
        <div className="sidebar">
          <SideBar activate="drivers" />
        </div>
        <div className="contents">
          <div className="contents-header">
            <div className="title">
              <FaHome color="black" size={30} />
              <Link to="/">
                <span>Back To Home Page</span>
              </Link>
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
                  onClick={() => {
                    setPreviewItem({});
                    setShowModal(true);
                  }}
                >
                  ADD NEW DRIVER
                </button>
                &nbsp;
                <button
                  style={{ padding: "5px 15px", borderRadius: 5 }}
                  className="orange-border bg-white"
                  onClick={() => setShowConfirm(true)}
                >
                  DELETE SELECTED DRIVERS
                </button>
              </div>
              {itemsList.length > 0 ? (
                <>
                  <table className="w-100">
                    <thead className="bg-light-orange">
                      <th className="p-2">
                        <input
                          type="checkbox"
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </th>
                      <th className="p-2">#</th>
                      <th className="p-2">Driver ID</th>
                      <th className="p-2">Driver Name</th>
                      <th className="p-2">Phone number</th>
                      <th className="p-2">Language</th>
                      <th className="p-2">Status</th>
                      <th></th>
                    </thead>
                    <tbody>
                      {itemsList.map((item, i) => (
                        <tr key={i}>
                          <td className="p-2">
                            <input
                              type="checkbox"
                              checked={checkedList.includes(item._id)}
                              onChange={(e) =>
                                handleCheck(e.target.checked, item._id)
                              }
                            />
                          </td>
                          <td className="p-2">{i + 1}</td>
                          <td className="p-2">{item.driverId}</td>
                          <td className="p-2">{item.name}</td>
                          <td className="p-2">{item.poneNumber} RWF</td>
                          <td className="p-2">{item.language}</td>
                          <td className="p-2">{item.status}</td>
                          <td className="p-2">
                            <button
                              className="btn bg-orange text-white"
                              onClick={() => {
                                setPreviewItem(item);
                                setShowModal(true);
                              }}
                            >
                              Edit
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
      <AddDriver
        setShowLoader={setShowLoader}
        showModal={showModal}
        setShowModal={setShowModal}
        itemsList={itemsList}
        setItemsList={setItemsList}
        item={previewItem}
        loadData={fetchItemLists}
      />
      <Confirm
        callBack={handleDelete}
        setShowConfirm={setShowConfirm}
        showConfirm={showConfirm}
      />
    </div>
  );
}

export default Drivers;
