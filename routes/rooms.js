const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Rooms = require("../model/rooms");
const Analytics = require("../model/analytics");

router.get("/all/", auth, (req, res) => {
  Rooms.find({ managerId: req.user.user_id }, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({ result });
    }
  });
});

router.get("/find/:id", (req, res) => {
  const id = req.params["id"];
  Rooms.findOne({ _id: id }, (err, result) => {
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
      await Analytics.create({
        managerId: req.user.user_id,
        itemId: rm._id,
        itemType: "room",
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        price,
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

router.post("/update/", auth, async (req, res) => {
  try {
    let updateId = "";
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const { price, description, id } = req.body;
    const result = await Rooms.updateOne(
      { managerId: req.user.user_id, _id: id },
      { description, price }
    );
    const analytics = await Analytics.find({ itemId: id, itemType: "room" });
    if (analytics && analytics.length > 0) {
      for (let i = 0; i < analytics.length; i++) {
        const x = analytics[i];
        if (x) {
          if (
            x.itemId == id &&
            x.day == day &&
            x.month == month &&
            x.year == year
          ) {
            updateId = x._id;
            break;
          }
        }
      }
      if (updateId !== "") {
        await Analytics.updateOne({ _id: updateId }, { price });
      } else {
        await Analytics.create({
          managerId: req.user.user_id,
          itemId: id,
          itemType: "room",
          day,
          month,
          year,
          price,
        });
      }
    } else {
      await Analytics.create({
        managerId: req.user.user_id,
        itemId: id,
        itemType: "room",
        day,
        month,
        year,
        price,
      });
    }
    return res.status(200).send({ result });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

router.post("/delete/", auth, async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Rooms.deleteOne({
      managerId: req.user.user_id,
      _id: id,
    });
    await Analytics.deleteMany({ itemType: "room", itemId: id });
    return res.status(200).send({ result });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

module.exports = router;
