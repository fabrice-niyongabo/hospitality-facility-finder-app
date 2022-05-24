import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { fetchCart } from "../../actions/cart";
import Loader from "../Dashboard/Modals/Loader";
import PlaceHolder from "../Facility/PlaceHolder";
import Header from "../Header";
import CartItem from "./CartItem";
import { Spinner } from "react-bootstrap";
import { errorHandler, toastMessage } from "../../helpers";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fullName, phone, email, token } = useSelector((state) => state.user);
  const { loading, facilityName, cart } = useSelector((state) => state.cart);
  const [showLoader, setShowLoader] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [quantities, setQuantities] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      if (quantities.length > 0) {
        const qty = quantities.filter((value) => value.index === i);
        if (qty.length === 1) {
          total += cart[i].price * qty[0].value;
        } else {
          total += cart[i].price;
        }
      } else {
        total += cart[i].price;
      }
    }
    return total;
  };
  const getDescription = () => {
    let desc = "Paying ";
    for (let i = 0; i < cart.length; i++) {
      desc += cart[i].menuName + ", ";
    }
    desc += "at " + facilityName;
    return desc;
  };
  const config = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: calculateTotal(),
    currency: "RWF",
    payment_options: "card,mobilemoney",
    customer: {
      email,
      phonenumber: "0" + phone,
      name: fullName,
    },
    customizations: {
      title: "Hospitality Finder - Order Checkout Page",
      description: getDescription(),
      logo: process.env.REACT_APP_PROJECT_LOGO,
    },
  };
  const handleFlutterPayment = useFlutterwave(config);
  const handleCheckout = () => {
    if (pickupDate.trim() === "" || pickupTime.trim() === "") {
      toastMessage("error", "Please select pickup date and pickup time");
      return;
    }
    setIsPaying(true);
    handleFlutterPayment({
      callback: (response) => {
        console.log(response);

        setIsPaying(false);
        if (response.status !== "successful") {
          toastMessage("Error", "Transaction failed!");
          setShowLoader(true);
          Axios.post(process.env.REACT_APP_BACKEND_URL + "/cart/cancelOrder/", {
            pickupDate,
            pickupTime,
            totalAmount: response.amount,
            managerId: cart[0].managerId,
            token,
          })
            .then((res) => {
              toastMessage("info", res.data.msg);
              navigate("/profile/failedOrders");
            })
            .catch((error) => {
              errorHandler(error);
            });
        } else {
          closePaymentModal();
          toastMessage("success", "Transaction paid successfull!");
          setShowLoader(true);
          Axios.post(
            process.env.REACT_APP_BACKEND_URL + "/cart/completedOrder/",
            {
              pickupDate,
              pickupTime,
              totalAmount: response.amount,
              managerId: cart[0].managerId,
              transactionId: response.transaction_id,
              token,
            }
          )
            .then((res) => {
              toastMessage("success", res.data.msg);
              navigate("/profile/completedOrders");
            })
            .catch((error) => {
              errorHandler(error);
            });
        }
      },
      onClose: () => {
        setIsPaying(false);
      },
    });
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
                  <CartItem
                    key={i}
                    index={i}
                    item={item}
                    setQuantities={setQuantities}
                    setShowLoader={setShowLoader}
                    quantities={quantities}
                  />
                ))}
              </table>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="date"
                    placeholder="Pickup date"
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="form-control"
                    value={pickupDate}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="time"
                    placeholder="Pickup time"
                    className="form-control"
                    onChange={(e) => setPickupTime(e.target.value)}
                    value={pickupTime}
                  />
                </div>
              </div>
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
                <button
                  className="btn bg-orange text-white"
                  onClick={() => handleCheckout()}
                  disabled={isPaying}
                >
                  {isPaying && (
                    <span>
                      <Spinner animation="border" size="sm" />
                    </span>
                  )}{" "}
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
