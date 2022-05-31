const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Drivers = require("../model/drivers");

router.get("/find/", auth, (req, res) => {
  Drivers.find({ managerId: req.user.user_id }, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({ result });
    }
  });
});

router.post("/register/", auth, async (req, res) => {
  const { name, driverId, phoneNumber, language, status } = req.body;
  try {
    const driver = await Drivers.findOne({
      phoneNumber,
      driverId,
    });
    if (driver) {
      res.status(400).send({
        msg: "Driver already exists.",
      });
    } else {
      const dr = await Drivers.create({
        name,
        driverId,
        phoneNumber,
        language,
        status,
        managerId: req.user.user_id,
      });
      res.status(201).json({
        msg: "Driver registered successfull!",
        driver: dr,
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/edit/", auth, async (req, res) => {
  const { name, driverId, phoneNumber, language, status, id } = req.body;
  try {
    await Drivers.updateOne(
      {
        _id: id,
        managerId: req.user.user_id,
      },
      { name, driverId, phoneNumber, language, status }
    );
    res.status(201).json({
      msg: "Driver updated successfull!",
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/remove/", auth, (req, res) => {
  const { items } = req.body;
  Drivers.deleteMany({ _id: { $in: items } }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      return res.status(200).send({ result });
    }
  });
});

module.exports = router;
