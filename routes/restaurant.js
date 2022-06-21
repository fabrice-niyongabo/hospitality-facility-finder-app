const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const RestaurantsMenus = require("../model/RestaurantsMenus");
const Analytics = require("../model/analytics");

router.get("/item/all/", auth, (req, res) => {
  RestaurantsMenus.find({ managerId: req.user.user_id }, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send({ result });
    }
  });
});

router.post("/item/add/", auth, async (req, res) => {
  const { name, quantity, price, description, category, image } = req.body;
  try {
    const room = await RestaurantsMenus.find({
      managerId: req.user_id,
      menuName: name,
      category,
    });
    if (room.length > 0) {
      res.status(400).send({
        msg: "Room already exists.",
      });
    } else {
      const rm = await RestaurantsMenus.create({
        menuName: name,
        quantity,
        price,
        description,
        category,
        image,
        managerId: req.user.user_id,
      });
      await Analytics.create({
        managerId: req.user.user_id,
        itemId: rm._id,
        itemType: "menu",
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        price,
      });
      return res.status(201).json({
        msg: "Menu created successfull!",
        menu: rm,
      });
    }
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

router.post("/item/update/", auth, async (req, res) => {
  try {
    let updateId = "";
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const { name, quantity, price, description, category, id } = req.body;
    const result = await RestaurantsMenus.updateOne(
      { managerId: req.user.user_id, _id: id },
      { menuName: name, quantity, price, description, category }
    );
    const analytics = await Analytics.find({ itemId: id });
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
          itemType: "menu",
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
        itemType: "menu",
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

router.get("/menus/:managerId/:category", (req, res) => {
  const menuCategory = req.params["category"];
  const managerId = req.params["managerId"];
  const query =
    menuCategory == "all"
      ? { managerId }
      : { category: menuCategory, managerId };
  RestaurantsMenus.find(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({ result });
    }
  });
});

router.post("/item/delete/", auth, (req, res) => {
  const { items } = req.body;
  RestaurantsMenus.deleteMany({ _id: { $in: items } }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      res.status(200).send({ result });
    }
  });
});

module.exports = router;
