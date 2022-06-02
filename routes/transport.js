const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const { randomNumber } = require("../helpers");

const Transportation = require("../model/transportation");
const Orders = require("../model/orders");
const Booking = require("../model/booking");
const Users = require("../model/users");
const Facility = require("../model/facility");

router.post("/book/", auth, async (req, res) => {
  const { km, departureTime, transactionId, driverLanguage, pt, type, amount } =
    req.body;

  //validate current transaction
  try {
    let parentTransction = null;
    if (type === "orders") {
      parentTransction = await Orders.findOne({
        _id: pt,
        customerId: req.user.user_id,
      });
    } else {
      parentTransction = await Booking.findOne({
        _id: pt,
        customerId: req.user.user_id,
      });
    }
    if (parentTransction) {
      let date =
        type === "orders"
          ? parentTransction.pickupDate
          : parentTransction.checkinDate;
      let tx = await Transportation.create({
        km: km,
        departureTime: departureTime,
        departureDate: date,
        transactionId: transactionId,
        driverLanguage: driverLanguage,
        paymentId: randomNumber(),
        status: "paid",
        amountPaid: amount,
        amountToBePaid: km * 1500,
        parentTransactionId: parentTransction._id,
        managerId: parentTransction.managerId,
        customerId: req.user.user_id,
      });
      return res
        .status(200)
        .send({ msg: "You have booked taxi successffuly", result: tx });
    } else {
      return res.status(400).send({ msg: "Invalid parent transaction ID" });
    }
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

router.get("/print/:id", auth, async (req, res) => {
  try {
    const id = req.params["id"];
    const tx = await Transportation.findOne({ _id: id });
    if (tx) {
      return res.status(200).send({ result: tx });
    } else {
      return res.status(200).send({ result: {} });
    }
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

router.get("/find/", auth, async (req, res) => {
  try {
    const result = [];
    const transport = await Transportation.find({ status: "paid" });
    if (transport) {
      for (let i = 0; i < transport.length; i++) {
        const customer = await Users.findOne({
          _id: transport[i].customerId,
        });
        const facility = await Facility.findOne({
          managerId: transport[i].managerId,
        });
        let obj = { ...transport[i]._doc };
        obj.customer = customer;
        obj.facility = facility;
        result.push(obj);
      }
    }
    return res.status(200).send({ result });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

router.post("/update/", auth, (req, res) => {
  const { driverId, id } = req.body;
  Transportation.updateOne(
    { _id: id },
    { driverId: driverId, deliveryStatus: "on the way" },
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err.message });
      } else {
        return res.status(200).send({ msg: "driver ID updated!" });
      }
    }
  );
});

module.exports = router;
