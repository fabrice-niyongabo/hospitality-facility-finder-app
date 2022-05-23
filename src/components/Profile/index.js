import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../Header";
import { AiFillEdit } from "react-icons/ai";
import "../../styles/profile.scss";
import Info from "./Info";
import Axios from "axios";
import { errorHandler } from "../../helpers";
import Loader from "../Dashboard/Modals/Loader";
function Profile() {
  const { fullName, token } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("pendingOrders");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    fetchData();
  }, [activeTab]);
  const fetchData = () => {
    setIsLoading(true);
    setErrorMessage("");
    Axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/profile/find/" +
        activeTab +
        "?token=" +
        token
    )
      .then((res) => {
        setIsLoading(false);
        setResults(res.data.result);
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
        if (error?.response?.data?.msg) {
          setErrorMessage(error.response.data.msg);
        } else {
          setErrorMessage(error.message);
        }
      });
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="text-end mt-4">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <h3 className="quicksand-font mb-0">{fullName}</h3>
            <span>&nbsp;&nbsp;</span>
            <AiFillEdit size={30} color="#f46a06" />
          </div>
        </div>
        <div className="my-4">
          <table className="w-100">
            <tr>
              <td colSpan={3} className="bg-light pt-2">
                <h4 className="text-center">Orders</h4>
              </td>
              <td colSpan={3} className="bg-light-orange pt-2">
                <h4 className="text-center">Booking</h4>
              </td>
            </tr>
            <tr>
              <td
                className={
                  activeTab === "pendingOrders"
                    ? "tab p-2 text-center bg-light active"
                    : "tab p-2 text-center bg-light"
                }
                onClick={() => setActiveTab("pendingOrders")}
              >
                Pending
              </td>
              <td
                className={
                  activeTab === "failedOrders"
                    ? "tab p-2 text-center bg-light active"
                    : "tab p-2 text-center bg-light"
                }
                onClick={() => setActiveTab("failedOrders")}
              >
                Failed
              </td>
              <td
                className={
                  activeTab === "completedOrders"
                    ? "tab p-2 text-center bg-light active"
                    : "tab p-2 text-center bg-light"
                }
                onClick={() => setActiveTab("completedOrders")}
              >
                Completed
              </td>
              <td
                className={
                  activeTab === "pendingBookings"
                    ? "tab p-2 text-center bg-light active"
                    : "tab p-2 text-center bg-light"
                }
                onClick={() => setActiveTab("pendingBookings")}
              >
                Pending
              </td>
              <td
                className={
                  activeTab === "failedBookings"
                    ? "tab p-2 text-center bg-light active"
                    : "tab p-2 text-center bg-light"
                }
                onClick={() => setActiveTab("failedBookings")}
              >
                Failed
              </td>
              <td
                className={
                  activeTab === "completedBookings"
                    ? "tab p-2 text-center bg-light active"
                    : "tab p-2 text-center bg-light"
                }
                onClick={() => setActiveTab("completedBookings")}
              >
                Completed
              </td>
            </tr>
          </table>
        </div>
        <Info
          activeTab={activeTab}
          results={results}
          isLoading={isLoading}
          errorMessage={errorMessage}
          fetchData={fetchData}
          setShowLoader={setShowLoader}
          token={token}
        />
      </div>
      <Loader showLoader={showLoader} />
    </>
  );
}

export default Profile;
