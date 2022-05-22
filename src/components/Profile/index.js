import React from "react";
import { useSelector } from "react-redux";
import Header from "../Header";
import { AiFillEdit } from "react-icons/ai";
import "../../styles/profile.scss";
function Profile() {
  const { fullName } = useSelector((state) => state.user);
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
        <div className="mt-4">
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
              <td className="tab p-2 text-center bg-light active">Pending</td>
              <td className="tab p-2 text-center bg-light">Failed</td>
              <td className="tab p-2 text-center bg-light">Completed</td>
              <td className="tab p-2 text-center bg-light-orange">Pending</td>
              <td className="tab p-2 text-center bg-light-orange">Failed</td>
              <td className="tab p-2 text-center bg-light-orange">Completed</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default Profile;
