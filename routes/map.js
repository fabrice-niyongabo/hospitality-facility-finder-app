const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const helpers = require("../helpers/");
const Facilities = require("../model/facility");

// router.get("/all/", async (req, res) => {
//   Facilities.find({}, (err, result) => {
//     if (err) {
//       return res.status(400).send({ msg: err });
//     } else {
//       res.status(200).send({ result });
//     }
//   });
// });

router.get("/all/:lat/:long", async (req, res) => {
  const lat = req.params["lat"];
  const long = req.params["long"];

  Facilities.find({ status: "active" }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err });
    } else {
      //filter only ones in the range of 7km
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
      console.log(realResult.length);
      if (realResult.length > 0)
        return res.status(200).send({
          result: realResult,
          msg:
            "Found " + realResult.length + " facilities that are near by you!.",
        });
      return res
        .status(200)
        .send({
          result,
          msg: "Unable to get facilities near by you at the moment. we are just showing you all available ones because they are located in more than 7km from your current location.",
        });
    }
  });
});

module.exports = router;
