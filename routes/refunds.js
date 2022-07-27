const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const Refunds = require("../model/refunds");

const Drivers = require("../model/drivers");

router.post("/request/", auth, async (req, res) => {
  const { orderId, orderType, description } = req.body;
  try {
    const oldRefund = await Refunds.find({ userId: req.user_id, orderId });
    if (oldRefund) {
      const refund = await Refunds.updateMany(
        { userId: req.user_id, orderId },
        {
          orderType,
          description,
        }
      );
      if (refund) {
        return res.status(200).send({
          msg: "Refund request submitted successfull. Please wait for admin to approve it. Further details will be communicated to you via your phone number or email address",
        });
      } else {
        res.status(400).send({
          msg: "Something went wrong, try again later after sometime.",
        });
      }
    } else {
      const refund = await Refunds.create({
        userId: req.user_id,
        orderId,
        orderType,
        description,
      });
      if (refund) {
        return res.status(200).send({
          msg: "Refund request submitted successfull. Please wait for admin to approve it. Further details will be communicated to you via your phone number or email address",
        });
      } else {
        res.status(400).send({
          msg: "Something went wrong, try again later after sometime.",
        });
      }
    }
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

module.exports = router;
