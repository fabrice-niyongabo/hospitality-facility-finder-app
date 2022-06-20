const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
var axios = require("axios");
const { randomNumber } = require("../helpers");

const Transportation = require("../model/transportation");
const Orders = require("../model/orders");
const Booking = require("../model/booking");
const Users = require("../model/users");
const Facility = require("../model/facility");

router.post("/send/", auth, async (req, res) => {
  const { phone, names, refNumber, amount, type, id } = req.body;
  console.log(type, id);
  var data = JSON.stringify({
    account_bank: "MPS",
    account_number: phone,
    amount,
    narration: "Payment transfer",
    currency: "RWF",
    reference: "HFF" + refNumber,
    beneficiary_name: names,
  });

  var config = {
    method: "post",
    url: "https://api.flutterwave.com/v3/transfers",
    headers: {
      Authorization: "Bearer " + process.env.SECRET,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if (type === "hotel") {
        Booking.updateOne(
          { _id: id },
          {
            transfered: "Pending",
            transferId: "HFF" + refNumber,
          },
          (err, result) => {
            if (!err) {
              return res
                .status(200)
                .send({ msg: "Transfer queed! and updated the status" });
            } else {
              return res.status(200).send({
                msg: "Transfer queed! but failed to update the status.",
              });
            }
          }
        );
      } else {
        Orders.updateOne(
          { _id: id },
          {
            transfered: "Pending",
            transferId: "HFF" + refNumber,
          },
          (err, result) => {
            if (!err) {
              return res
                .status(200)
                .send({ msg: "Transfer queed! and updated the status" });
            } else {
              return res.status(200).send({
                msg: "Transfer queed! but failed to update the status.",
              });
            }
          }
        );
      }
    })
    .catch(function (error) {
      if (error.response?.data?.message) {
        return res.status(400).send({ msg: error.response.data.message });
      } else {
        return res.status(400).send({ msg: error.message });
      }
    });
});

module.exports = router;
