import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../actions/cart";
import Loader from "../Dashboard/Modals/Loader";
import PlaceHolder from "../Facility/PlaceHolder";
import Header from "../Header";
import CartItem from "./CartItem";

function Cart() {
  const dispatch = useDispatch();
  const { loading, facilityName, cart } = useSelector((state) => state.cart);
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price;
    }
    return total;
  };
  return (
    <>
      <Header />
      <div className="container">
        <p className="mt-3 px-3 text-orange">
          Cart full details {facilityName != "" && <> | {facilityName}</>}
        </p>
      </div>
      {loading ? (
        <PlaceHolder />
      ) : (
        <>
          {cart.length > 0 ? (
            <div className="container">
              <table className="table border">
                {cart.map((item, i) => (
                  <CartItem key={i} item={item} setShowLoader={setShowLoader} />
                ))}
              </table>
              <div
                className="bg-light-orange p-3 mb-5 text-end"
                style={{
                  alignItems: "center",
                  justifyContent: "flex-end",
                  display: "flex",
                }}
              >
                <h3>TOTAL: {calculateTotal()} RWF</h3>
                <span>&nbsp;&nbsp;</span>
                <button className="btn bg-orange text-white">
                  Continue to checkout
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                display: "flex",
                height: "60vh",
              }}
            >
              <img
                src={require("../../assets/not_found.png")}
                alt=""
                style={{ width: 250 }}
              />
              <p>Your cart seems to be empty.</p>
            </div>
          )}
        </>
      )}
      <Loader showLoader={showLoader} />
    </>
  );
}

export default Cart;
