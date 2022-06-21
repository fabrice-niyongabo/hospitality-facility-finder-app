const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Analytics = require("../model/analytics");
const Rooms = require("../model/rooms");

router.get("/find/:type", auth, async (req, res) => {
  try {
    const type = req.params["type"];
    const results = [];
    if (type === "menu") {
      const analytics = await Analytics.find({
        itemType: type,
        managerId: req.user.user_id,
      });
      for (let i = 0; i < analytics.length; i++) {
        const item = await Rooms.findOne({ _id: analytics[i].itemId });
        results.push({ item, ...analytics[i]._doc });
      }
    }

    res.status(200).send({ results });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = router;
