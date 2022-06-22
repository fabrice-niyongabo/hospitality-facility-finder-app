const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Analytics = require("../model/analytics");
const Rooms = require("../model/rooms");
const RestaurantsMenus = require("../model/RestaurantsMenus");

router.get("/find/:type", auth, async (req, res) => {
  try {
    const type = req.params["type"];
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const uniqueItems = [];
    const results = [];
    if (type === "menu") {
      const analytics = await Analytics.find({
        itemType: type,
        managerId: req.user.user_id,
        year,
        month,
      });

      for (let i = 0; i < analytics.length; i++) {
        if (!uniqueItems.includes(analytics[i].itemId)) {
          uniqueItems.push(analytics[i].itemId);
        }
      }
      for (let i = 0; i < uniqueItems.length; i++) {
        const item = await RestaurantsMenus.findOne({
          _id: uniqueItems[i],
        });
        results.push({
          item,
          data: analytics.filter((item) => item._doc.itemId === uniqueItems[i]),
        });
      }
    }
    if (type === "room") {
      const analytics = await Analytics.find({
        itemType: type,
        managerId: req.user.user_id,
        year,
        month,
      });

      for (let i = 0; i < analytics.length; i++) {
        if (!uniqueItems.includes(analytics[i].itemId)) {
          uniqueItems.push(analytics[i].itemId);
        }
      }
      for (let i = 0; i < uniqueItems.length; i++) {
        const item = await Rooms.findOne({
          _id: uniqueItems[i],
        });
        results.push({
          item,
          data: analytics.filter((item) => item._doc.itemId === uniqueItems[i]),
        });
      }
    }

    if (type === "transport") {
      const analytics = await Analytics.find({
        itemType: type,
        managerId: req.user.user_id,
        year,
        month,
      });

      for (let i = 0; i < analytics.length; i++) {
        if (!uniqueItems.includes(analytics[i].itemId)) {
          uniqueItems.push(analytics[i].itemId);
        }
      }
      for (let i = 0; i < uniqueItems.length; i++) {
        results.push({
          item: {},
          data: analytics.filter((item) => item._doc.itemId === uniqueItems[i]),
        });
      }
    }

    res.status(200).send({ results });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = router;
