const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Facilities = require("../model/facility");

router.get("/all/", async (req, res) => {
  Facilities.find({}, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err });
    } else {
      res.status(200).send({ result });
    }
  });
});

module.exports = router;
