const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Booking = require("../model/booking");

router.get("/find/:category", auth, (req, res) => {
  const category = req.params["category"];
  let query = {};
  if (category === "pendingBookings")
    query = { paymentStatus: "pending", customerId: req.user.user_id };
  if (category === "failedBookings")
    query = { paymentStatus: "failed", customerId: req.user.user_id };
  if (category === "completedBookings")
    query = { paymentStatus: "paid", customerId: req.user.user_id };
  if (
    category === "pendingBookings" ||
    category === "failedBookings" ||
    category === "completedBookings"
  ) {
    Booking.find(query, (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err.message });
      } else {
        return res.status(200).send({ result });
      }
    });
  } else {
    return res.status(200).send({ result: [] });
  }
});

module.exports = router;
