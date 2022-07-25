const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Facilities = require("../model/facility");
const Services = require("../model/services");
const Rooms = require("../model/rooms");
const Users = require("../model/users");
const helpers = require("../helpers/");

router.get("/detail", auth, (req, res) => {
  Facilities.find({ managerId: req.user.user_id }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      res.status(200).send({ result });
    }
  });
});

router.get("/getMyBranches", auth, async (req, res) => {
  try {
    let mainBranch = "";
    const result = await Facilities.find({
      $or: [
        { managerId: req.user.user_id },
        { mainManagerId: req.user.user_id },
      ],
    });
    for (let i = 0; i < result.length; i++) {
      if (result[i].mainManagerId !== "none") {
        mainBranch = result[i].mainManagerId;
        break;
      }
    }
    if (mainBranch !== "") {
      return res.status(200).send({
        result: await Facilities.find({
          $or: [{ managerId: mainBranch }, { mainManagerId: mainBranch }],
        }),
      });
    } else {
      return res.status(200).send({ result });
    }
  } catch (error) {
    return res.status(400).send({ msg: err.message });
  }
});

//admin
router.get("/find/category/:category", (req, res) => {
  const category = req.params["category"];
  let query = { type: { $ne: "transport" } };
  if (category === "restaurants") query = { type: "restaurant" };
  if (category === "transports") query = { type: "transport" };
  if (category === "coffeeshops") query = { type: "coffeeshop" };
  if (category === "hotels") query = { type: "hotel", mainManagerId: "none" };
  if (category === "hotelsb")
    query = { type: "hotel", mainManagerId: { $ne: "none" } };
  Facilities.find(query, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      res.status(200).send({ result });
    }
  });
});
//admin

router.post("/approve/", auth, async (req, res) => {
  try {
    const { f_id, m_id, f_t, f_n, lat, long } = req.body;
    const x = await Facilities.updateOne(
      { _id: f_id, managerId: m_id },
      { status: "active", lat, long }
    );
    if (x) {
      await Users.updateOne({ _id: m_id }, { role: f_t, companyName: f_n });
      return res.status(200).send({ msg: "Facility approved!" });
    } else {
      return res.status(400).send({ msg: "Can't find facility" });
    }
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

router.post("/reject/", auth, async (req, res) => {
  try {
    const { f_id } = req.body;
    const x = await Facilities.deleteOne({ _id: f_id, status: "inactive" });
    return res.status(200).send({ msg: "Facility Rejected!" });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

router.get("/find/category/:category/:lat/:long", (req, res) => {
  const category = req.params["category"];
  const lat = req.params["lat"];
  const long = req.params["long"];
  let query = { type: { $ne: "transport" }, status: "active" };
  if (category === "restaurants")
    query = { type: "restaurant", status: "active" };
  if (category === "transports")
    query = { type: "transport", status: "active" };
  if (category === "coffeeshops")
    query = { type: "coffeeshop", status: "active" };
  if (category === "hotels") query = { type: "hotel", status: "active" };
  Facilities.find(query, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      const realResult = [];
      for (let i = 0; i < result.length; i++) {
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

router.post("/createBranch/", auth, async (req, res) => {
  const {
    name,
    latitude,
    longitude,
    averagePrice,
    stars,
    address,
    managerId,
    type,
    mainName,
  } = req.body;
  try {
    //validate manager
    const manager = await Users.findOne({ _id: managerId });
    if (manager) {
      const branchUser = await Users.create({
        fullName: manager.fullName,
        email: manager.email + helpers.randomNumber(),
        password: manager.password,
        phone: manager.phone + helpers.randomNumber,
        role: type,
        token: "branch token",
        companyName: "Branch of " + manager.companyName,
      });
      const facility = await Facilities.create({
        managerId: branchUser._id,
        name,
        type,
        description: "",
        address,
        stars,
        averagePrice,
        lat: latitude,
        long: longitude,
        image: "",
        mainManagerId: managerId,
        mainName,
      });
      await Users.updateOne(
        { _id: manager._id },
        { companyName: name, role: type }
      );
      res.status(200).send({ msg: "Branch created successfull", facility });
    } else {
      return res.status(400).send({ msg: "Invalid manager ID." });
    }
  } catch (error) {
    return res.status(400).send({ msg: error.message });
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
