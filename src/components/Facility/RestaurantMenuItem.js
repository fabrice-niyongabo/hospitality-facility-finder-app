import React, { useState } from "react";
import Axios from "axios";
import { FiImage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toastMessage } from "../../helpers";
import { setCart } from "../../actions/cart";
function RestaurantMenuItem({ item, setShowLoader, restoName }) {
  const dispatch = useDispatch();
  const { facilityName, managerId, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.user);
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
  const handleAddToCart = () => {
    if (managerId != item.managerId && managerId != "") {
      console.log("no match");
    } else {
      let data;
      setShowLoader(true);
      if (token && token.trim() !== "") {
        data = {
          managerId: item.managerId,
          price: item.price,
          quantity,
          facilityName: restoName,
          menuName: item.menuName,
          menuId: item._id,
          menuDescription: item.description,
          menuImage: item.image,
          token,
        };
      } else {
        data = {
          managerId: item.managerId,
          price: item.price,
          quantity,
          facilityName: restoName,
          menuName: item.menuName,
          menuId: item._id,
          menuDescription: item.description,
          menuImage: item.image,
        };
      }
      Axios.post(process.env.REACT_APP_BACKEND_URL + "/cart/add/", data)
        .then((res) => {
          setShowLoader(false);
          console.log(res.data);
          toastMessage("success", res.data.msg);
          dispatch(setCart([...cart, res.data.item]));
        })
        .catch((error) => {
          setShowLoader(false);
          console.log(error);
        });
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
          <button
            className="btn bg-orange text-white"
            onClick={() => {
              handleAddToCart();
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenuItem;
