const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Facilities = require("../model/facility");
const Services = require("../model/services");
const Rooms = require("../model/rooms");

router.get("/detail", auth, (req, res) => {
  Facilities.find({ managerId: req.user.user_id }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      res.status(200).send({ result });
    }
  });
});

router.get("/find/all/", (req, res) => {
  Facilities.find({}, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      res.status(200).send({ result });
    }
  });
});

router.post("/find/", (req, res) => {
  const { id } = req.body;
  if (id) {
    Facilities.find({ _id: id }, (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err.message });
      } else {
        res.status(200).send({ result });
      }
    });
  } else {
    return res.status(400).send({ msg: "invalid request" });
  }
});

router.get("/find/hotels/", (req, res) => {
  Facilities.find({ type: "hotel" }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      res.status(200).send({ result });
    }
  });
});

router.get("/services/:id", (req, res) => {
  const { id } = req.params;
  Services.find({ managerId: id }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err });
    } else {
      res.status(200).send({ result });
    }
  });
});

router.get("/rooms/:id", (req, res) => {
  const { id } = req.params;
  Rooms.find({ managerId: id }, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({ result });
    }
  });
});

router.get("/find/restaurants/", (req, res) => {
  Facilities.find({ type: "restaurant" }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      res.status(200).send({ result });
    }
  });
});

router.get("/find/coffeeshops/", (req, res) => {
  Facilities.find({ type: "coffeeshop" }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      res.status(200).send({ result });
    }
  });
});

router.post("/updateFacility/", auth, (req, res) => {
  const { name, description, address, stars, averagePrice, image } = req.body;
  if (image.trim() !== "") {
    Facilities.updateOne(
      { managerId: req.user.user_id },
      { name, description, address, stars, averagePrice, image },
      (err, result) => {
        if (err) {
          console.log(error);
          return res.status(400).send({ msg: err.message });
        } else {
          res.status(200).send({ result });
        }
      }
    );
  } else {
    Facilities.updateOne(
      { managerId: req.user.user_id },
      { name, description, address, stars, averagePrice },
      (err, result) => {
        if (err) {
          console.log(error);
          return res.status(400).send({ msg: err.message });
        } else {
          res.status(200).send({ result });
        }
      }
    );
  }
});

module.exports = router;
