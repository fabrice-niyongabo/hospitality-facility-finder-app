const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Booking = require("../model/booking");
const Users = require("../model/users");
const Facility = require("../model/facility");

// router.get("/master/", auth, (req, res) => {
//   Booking.aggregate(
//     [
//       {
//         $lookup: {
//           from: "facilities",
//           localField: "managerId",
//           foreignField: "managerId",
//           as: "facility",
//         },
//       },
//     ],
//     (err, result) => {
//       if (err) {
//         return res.status(400).send(err);
//       } else {
//         return res.status(200).send({ result });
//       }
//     }
//   );
// });

router.get("/master/", auth, async (req, res) => {
  try {
    const result = [];
    const trans = await Booking.find({});
    for (let i = 0; i < trans.length; i++) {
      const facility = await Facility.find({
        managerId: trans[i].managerId,
      });
      const customer = await Users.find({ _id: trans[i].customerId });
      result.push({ ...trans[i]._doc, facility, customer });
    }
    return res.status(200).send({ result });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.get("/manager/", auth, async (req, res) => {
  try {
    const result = [];
    const trans = await Booking.find({ managerId: req.user.user_id });
    for (let i = 0; i < trans.length; i++) {
      const facility = await Facility.find({
        managerId: trans[i].managerId,
      });
      const customer = await Users.find({ _id: trans[i].customerId });
      result.push({ ...trans[i]._doc, facility, customer });
    }
    return res.status(200).send({ result });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.get("/all/", auth, (req, res) => {
  Booking.find({ managerId: req.user.user_id }, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({ result });
    }
  });
});

router.post("/book/", auth, async (req, res) => {
  const { checkIn, checkOut, price, managerId, roomId } = req.body;
  let totalDays;
  try {
    if (checkOut !== "" && checkIn !== "") {
      const cIn = new Date(checkIn);
      const cOut = new Date(checkOut);
      const difference_In_Time = cOut.getTime() - cIn.getTime();
      const diff = difference_In_Time / (1000 * 3600 * 24);
      if (diff === 0) totalDays = 1;
      totalDays = diff;
    } else {
      totalDays = 1;
    }

    //delete

    // const oldBooking = await Booking.findOne({
    //   paymentStatus: { $ne: "pending" },
    //   $or: [{ checkinDate: checkIn }, { checkoutDate: checkOut }],
    // });

    const oldBooking = await Booking.findOne({
      $or: [{ checkinDate: checkIn }, { checkoutDate: checkOut }],
      $and: [{ paymentStatus: "paid" }],
    });

    if (oldBooking) {
      return res.status(409).send({
        msg: "This room has already been booked for dates you chosed, Please try different dates.",
      });
    }

    const booking = await Booking.create({
      roomId,
      managerId,
      customerId: req.user.user_id,
      checkinDate: checkIn,
      checkoutDate: checkOut,
      pricePerDay: price,
      totalDays: totalDays,
    });
    res.status(201).json({
      msg: "Room booked successfull!",
      booking,
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/cancel/", auth, async (req, res) => {
  const { id } = req.body;
  try {
    await Booking.updateOne(
      { _id: id, customerId: req.user.user_id },
      { paymentStatus: "failed" }
    );
    res.status(201).json({
      msg: "Transaction cancelled successfull",
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/approve/", auth, async (req, res) => {
  const { id, totalAmount, transactionId } = req.body;
  try {
    await Booking.updateOne(
      { _id: id, customerId: req.user.user_id },
      { paymentStatus: "paid", transactionId, totalAmount }
    );
    res.status(201).json({
      msg: "Transaction approved successfull",
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// router.post("/delete/", async (req, res) => {
//   const { id } = req.body;
//   try {
//     if (req.body?.token && verifyToken(req.body?.token)) {
//       await Cart.deleteOne({
//         _id: id,
//         customerId: verifyToken(req.body.token).user_id,
//       });
//       res.status(201).json({
//         msg: "Cart Item Deleted successfull!",
//       });
//     } else {
//       await Cart.deleteOne({ _id: id, ipAddress: getMyIp(req) });
//       res.status(201).json({
//         msg: "Cart Item Deleted successfull!",
//       });
//     }
//   } catch (error) {
//     res.status(400).send({ msg: error.message });
//   }
// });

module.exports = router;
