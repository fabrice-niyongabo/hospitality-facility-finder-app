const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Booking = require("../model/booking");
const Cart = require("../model/cart");
const Orders = require("../model/orders");
const Transportation = require("../model/transportation");
const Facility = require("../model/facility");

router.get("/find/:category", auth, async (req, res) => {
  const category = req.params["category"];
  let query = {};
  try {
    if (
      category === "pendingBookings" ||
      category === "failedBookings" ||
      category === "completedBookings"
    ) {
      const result = [];
      if (category === "pendingBookings")
        query = { paymentStatus: "pending", customerId: req.user.user_id };
      if (category === "failedBookings")
        query = { paymentStatus: "failed", customerId: req.user.user_id };
      if (category === "completedBookings")
        query = { paymentStatus: "paid", customerId: req.user.user_id };
      const booking = await Booking.find(query);
      if (booking) {
        for (let i = 0; i < booking.length; i++) {
          const transport = await Transportation.findOne({
            parentTransactionId: booking[i]._id,
          });
          const facility = await Facility.findOne({
            managerId: booking[i].managerId,
          });
          let obj = { ...booking[i]._doc };
          obj.transport = transport;
          obj.facility = facility;
          result.push(obj);
        }
      }
      return res.status(200).send({ result });
    } else {
      const result = [];
      if (category === "pendingOrders")
        query = { status: "pending", customerId: req.user.user_id };
      if (category === "failedOrders")
        query = { status: "failed", customerId: req.user.user_id };
      if (category === "completedOrders")
        query = { status: "paid", customerId: req.user.user_id };
      const orders = await Orders.find(query);
      if (orders) {
        for (let i = 0; i < orders.length; i++) {
          const transport = await Transportation.findOne({
            parentTransactionId: orders[i]._id,
          });
          const facility = await Facility.findOne({
            managerId: orders[i].managerId,
          });
          let obj = { ...orders[i]._doc };
          obj.transport = transport;
          obj.facility = facility;
          result.push(obj);
        }
      }
      return res.status(200).send({ result });
    }
  } catch (error) {
    return res.status(400).send({ msg: error.message });
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
