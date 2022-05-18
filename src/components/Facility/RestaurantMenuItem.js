import React, { useState } from "react";

import { FiImage } from "react-icons/fi";
function RestaurantMenuItem({ item }) {
  const [quantity, setQuantity] = useState(1);
  const handlePlus = () => {
    if (quantity + 1 <= item.quantity) {
      setQuantity(quantity + 1);
    }
  };
  const handleMinus = () => {
    if (quantity - 1 > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="col-md-4">
      <div
        className="facility-container shadow p-3 bg-white"
        style={{ borderRadius: 10 }}
      >
        {item.image.trim() === "" ? (
          <FiImage color="#f46a06" size={300} />
        ) : (
          <img
            alt={item.name}
            src={process.env.REACT_APP_BACKEND_FILE_URL + item.image}
            className="img"
            style={{
              borderRadius: 5,
            }}
          />
        )}
        <div className="title-container" style={{ flexDirection: "column" }}>
          <h3>{item.menuName}</h3>
          <p className="text-orange h3">{item.price} RWF</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <table>
            <tr>
              <td>
                <span className="h4">QTY: </span>
              </td>
              <td>&nbsp;&nbsp;</td>
              <td>
                <button className="btn" onClick={handleMinus}>
                  <span className="h4">-</span>
                </button>
              </td>
              <td>&nbsp;&nbsp;</td>
              <td>
                <span className="h4">{quantity}</span>
              </td>
              <td>&nbsp;&nbsp;</td>
              <td>
                <button className="btn" onClick={handlePlus}>
                  <span className="h4">+</span>
                </button>
              </td>
            </tr>
          </table>
          <button className="btn bg-orange text-white">Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenuItem;
