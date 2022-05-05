const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Services = require("../model/services");

router.get("/all/", auth, (req, res) => {
  Services.find({ managerId: req.user.user_id }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err });
    } else {
      res.status(200).send({ result });
    }
  });
});

router.post("/add/", auth, async (req, res) => {
  const { name } = req.body;
  try {
    const service = await Services.findOne({
      name: name,
      managerId: req.user_id,
    });
    if (service) {
      res.status(400).send({
        msg: "Service name already exists.",
      });
    } else {
      const rm = await Services.create({
        name,
        managerId: req.user.user_id,
      });
      res.status(201).send({
        msg: "Service added successfull!",
        service: rm,
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/delete/", auth, (req, res) => {
  const { id } = req.body;
  Services.deleteOne(
    { managerId: req.user.user_id, _id: id },
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err.message });
      } else {
        res.status(200).send({ result });
      }
    }
  );
});

module.exports = router;
