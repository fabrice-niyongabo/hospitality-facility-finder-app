const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Booking = require("../model/booking");

// router.get("/all/", (req, res) => {
//   const token =
//     req.body.token || req.query.token || req.headers["access-token"];
//   if (!token) {
//     Cart.find({ ipAddress: getMyIp(req) }, (err, result) => {
//       if (err) {
//         return res.status(400).send(err);
//       } else {
//         res.status(200).send({ result });
//       }
//     });
//   } else {
//     if (verifyToken(token)) {
//       Cart.find({ customerId: verifyToken(token).user_id }, (err, result) => {
//         if (err) {
//           return res.status(400).send(err);
//         } else {
//           res.status(200).send({ result });
//         }
//       });
//     } else {
//       return res.status(401).send({ msg: "invalid token", tokenError: true });
//     }
//   }
// });

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
    });

    if (oldBooking) {
      return res.status(409).send({
        msg: "This room has already been booked for dates you chosed, Please try different dates.",
      });
    }

    await Booking.create({
      roomId,
      managerId,
      customerId: req.user.user_id,
      checkinDate: checkIn,
      checkoutDate: checkOut,
      pricePerDay: price,
      totalDays: totalDays,
    });
    res.status(201).json({
      msg: "Item Added to cart successfull!",
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/cancel/", auth, async (req, res) => {
  const { id } = req.body;
  try {
    await Booking.updateOne({ _id: id }, { paymentStatus: "failed" });
    res.status(201).json({
      msg: "Transaction cancelled successfull",
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
