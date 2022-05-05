const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Rooms = require("../model/rooms");

router.get("/all/", auth, (req, res) => {
  Rooms.find({ managerId: req.user.user_id }, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({ result });
    }
  });
});

router.post("/add/", auth, async (req, res) => {
  const { roomNumber, price, roomType, description, image } = req.body;
  try {
    const room = await Rooms.find({
      managerId: req.user_id,
      roomNumber,
    });
    if (room.length > 0) {
      res.status(400).send({
        msg: "Room already exists.",
      });
    } else {
      const rm = await Rooms.create({
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
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/update/", auth, (req, res) => {
  const { price, description, id } = req.body;
  Rooms.updateOne(
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
  Rooms.deleteOne({ managerId: req.user.user_id, _id: id }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      res.status(200).send({ result });
    }
  });
});

module.exports = router;
