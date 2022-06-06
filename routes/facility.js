const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Facilities = require("../model/facility");
const Services = require("../model/services");
const Rooms = require("../model/rooms");
const Users = require("../model/users");

router.get("/detail", auth, (req, res) => {
  Facilities.find({ managerId: req.user.user_id }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      res.status(200).send({ result });
    }
  });
});

router.get("/find/category/:category/:lat/:long", (req, res) => {
  const category = req.params["category"];
  const lat = req.params["lat"];
  const long = req.params["long"];
  let query = { type: { $ne: "transport" } };
  if (category === "restaurants") query = { type: "restaurant" };
  if (category === "transports") query = { type: "transport" };
  if (category === "coffeeshops") query = { type: "coffeeshop" };
  if (category === "hotels") query = { type: "hotel" };
  Facilities.find(query, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      const realResult = [];
      for (let i = 0; i < result.longth; i++) {
        const km = helpers.calCulateDistance(
          lat,
          long,
          result[i].lat,
          result[i].long
        );
        if (km <= 7) {
          realResult.push(result[i]);
        }
      }
      res.status(200).send({ result: realResult });
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

router.get("/services/:id", (req, res) => {
  const id = req.params["id"];
  Services.find({ managerId: id }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err });
    } else {
      res.status(200).send({ result });
    }
  });
});

router.post("/create/", auth, async (req, res) => {
  const {
    name,
    latitude,
    longitude,
    averagePrice,
    stars,
    address,
    managerId,
    type,
  } = req.body;
  //validate type
  if (
    type === "hotel" ||
    type === "restaurant" ||
    type === "coffeeshop" ||
    type === "transport"
  ) {
    //validate manager
    const manager = await Users.findOne({ _id: managerId, role: "user" });
    if (manager) {
      const facility = await Facilities.create({
        managerId,
        name,
        type,
        description: "",
        address,
        stars,
        averagePrice,
        lat: latitude,
        long: longitude,
        image: "",
      });
      await Users.updateOne(
        { _id: manager._id },
        { companyName: name, role: type }
      );
      res.status(200).send({ msg: "Facility created successfull", facility });
    } else {
      return res.status(400).send({ msg: "Invalid manager ID." });
    }
  } else {
    return res.status(400).send({ msg: "Invalid facility type." });
  }
});

router.post("/edit/", auth, async (req, res) => {
  const {
    id,
    name,
    latitude,
    longitude,
    averagePrice,
    stars,
    address,
    managerId,
    type,
    status,
  } = req.body;
  //validate type
  if (type === "hotel" || type === "restaurant" || type === "coffeeshop") {
    //validate manager
    const manager = await Users.findOne({ _id: managerId, role: "user" });
    if (manager) {
      const facility = await Facilities.updateOne(
        { _id: id },
        {
          managerId,
          name,
          type,
          address,
          stars,
          status,
          averagePrice,
          lat: latitude,
          long: longitude,
        }
      );
      await Users.updateOne(
        { _id: manager._id },
        { companyName: name, role: type }
      );
      res.status(200).send({ msg: "Facility created successfull", facility });
    } else {
      const facility = await Facilities.updateOne(
        { _id: id },
        {
          name,
          type,
          address,
          stars,
          status,
          averagePrice,
          lat: latitude,
          long: longitude,
        }
      );
      res.status(200).send({ msg: "Facility updated successfull" });
    }
  } else {
    return res.status(400).send({ msg: "Invalid facility type." });
  }
});

router.get("/rooms/:id", (req, res) => {
  const id = req.params["id"];
  Rooms.find({ managerId: id }, (err, result) => {
    if (err) {
      return res.status(400).send(err);
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
