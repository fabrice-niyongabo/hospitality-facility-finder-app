const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const { verifyToken, getMyIp } = require("../helpers");

const Orders = require("../model/orders");
const Users = require("../model/users");
const Facility = require("../model/facility");
const Cart = require("../model/cart");

router.get("/all/", auth, (req, res) => {
  Orders.find(
    { customerId: req.user.user_id, status: "pending" },
    (err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        return res.status(200).send({ result });
      }
    }
  );
});

// router.get("/master/", auth, (req, res) => {
//   Orders.aggregate(
//     [
//       {
//         $lookup: {
//           from: "facilities",
//           localField: "managerId",
//           foreignField: "managerId",
//           as: "facility",
//         },
//       },
//     ],
//     (err, result) => {
//       if (err) {
//         return res.status(400).send(err);
//       } else {
//         return res.status(200).send({ result });
//       }
//     }
//   );
// });

router.get("/master/", auth, async (req, res) => {
  try {
    const result = [];
    const trans = await Orders.find({});
    for (let i = 0; i < trans.length; i++) {
      const facility = await Facility.find({
        managerId: trans[i].managerId,
      });
      const customer = await Users.find({ _id: trans[i].customerId });
      result.push({ ...trans[i]._doc, facility, customer });
    }
    return res.status(200).send({ result });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.get("/manager/", auth, async (req, res) => {
  try {
    const result = [];
    const trans = await Orders.find({ managerId: req.user.user_id });
    for (let i = 0; i < trans.length; i++) {
      const facility = await Facility.find({
        managerId: trans[i].managerId,
      });
      const customer = await Users.find({ _id: trans[i].customerId });
      result.push({ ...trans[i]._doc, facility, customer });
    }
    return res.status(200).send({ result });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.post("/add/", async (req, res) => {
  const { managerId, price, roomType, description, image } = req.body;
  try {
    if (req.body?.token && verifyToken(req.body?.token)) {
      const order = await Orders.find({
        managerId: managerId,
        clientId: verifyToken.user_id,
        status: "pending",
      });

      if (order.length > 0) {
        res.status(400).send({
          msg: "Room already exists.",
        });
      } else {
        const rm = await Orders.create({
          roomNumber,
          price,
          type: roomType,
          description,
          image,
          facilityId: "",
          managerId: req.user.user_id,
        });
        res.status(201).json({
          msg: "Room created successfull!",
          room: rm,
        });
      }
    } else {
      //ip address
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/update/", auth, (req, res) => {
  const { price, description, id } = req.body;
  Orders.updateOne(
    { managerId: req.user.user_id, _id: id },
    { description, price },
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err.message });
      } else {
        res.status(200).send({ result });
      }
    }
  );
});

router.post("/delete/", auth, (req, res) => {
  const { id } = req.body;
  Orders.deleteOne({ managerId: req.user.user_id, _id: id }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      res.status(200).send({ result });
    }
  });
});

router.get("/find/:status", auth, async (req, res) => {
  try {
    const status = req.params["status"];
    const result = [];
    let query = {};
    if (status === "all") {
      query = { managerId: req.user.user_id };
    } else {
      query = { managerId: req.user.user_id, status };
    }

    const results = await Orders.find(query);

    for (let i = 0; i < results.length; i++) {
      const customer = await Users.findOne({ _id: results[i].customerId });
      result.push({
        order: results[i],
        customer: { name: customer?.fullName, email: customer?.email },
      });
    }
    return res.status(200).send({ result });
  } catch (error) {
    return res.status(400).send(err.message);
  }
});

router.get("/orderDetails/:id", auth, (req, res) => {
  const id = req.params["id"];
  Cart.find({ orderId: id, managerId: req.user.user_id }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      return res.status(200).send({ result });
    }
  });
});

module.exports = router;
