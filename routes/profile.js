const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Booking = require("../model/booking");
const Cart = require("../model/cart");
const Orders = require("../model/orders");

router.get("/find/:category", auth, (req, res) => {
  const category = req.params["category"];
  let query = {};
  if (
    category === "pendingBookings" ||
    category === "failedBookings" ||
    category === "completedBookings"
  ) {
    if (category === "pendingBookings")
      query = { paymentStatus: "pending", customerId: req.user.user_id };
    if (category === "failedBookings")
      query = { paymentStatus: "failed", customerId: req.user.user_id };
    if (category === "completedBookings")
      query = { paymentStatus: "paid", customerId: req.user.user_id };

    Booking.find(query, (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err.message });
      } else {
        return res.status(200).send({ result });
      }
    });
  } else {
    if (category === "pendingOrders")
      query = { status: "pending", customerId: req.user.user_id };
    if (category === "failedOrders")
      query = { status: "failed", customerId: req.user.user_id };
    if (category === "completedOrders")
      query = { status: "paid", customerId: req.user.user_id };
    Orders.find(query, (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err.message });
      } else {
        return res.status(200).send({ result });
      }
    });
  }
});

router.get("/orderDetails/:id", auth, (req, res) => {
  const id = req.params["id"];
  Cart.find({ orderId: id, customerId: req.user.user_id }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      return res.status(200).send({ result });
    }
  });
});

module.exports = router;
