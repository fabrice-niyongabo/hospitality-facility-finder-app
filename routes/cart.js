const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const { verifyToken, getMyIp } = require("../helpers");

const Cart = require("../model/cart");

router.get("/all/", (req, res) => {
  const token =
    req.body.token || req.query.token || req.headers["access-token"];
  if (!token) {
    Cart.find({ ipAddress: getMyIp(req) }, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        res.status(200).send({ result });
      }
    });
  } else {
    if (verifyToken(token)) {
      Cart.find({ customerId: verifyToken(token).user_id }, (err, result) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          res.status(200).send({ result });
        }
      });
    } else {
      return res.status(401).send({ msg: "invalid token", tokenError: true });
    }
  }
});

router.post("/add/", async (req, res) => {
  const {
    managerId,
    price,
    quantity,
    facilityName,
    menuName,
    menuId,
    menuDescription,
    menuImage,
  } = req.body;
  try {
    if (req.body?.token && verifyToken(req.body?.token)) {
      //delete
      await Cart.deleteMany({
        managerId: { $ne: managerId },
        customerId: verifyToken(req.body.token).user_id,
      });

      const itemExists = await Cart.findOne({
        menuId: menuId,
        customerId: verifyToken(req.body.token).user_id,
      });

      if (itemExists) {
        return res
          .status(409)
          .send({ msg: "Item already exists in the cart." });
      }

      const rm = await Cart.create({
        menuId: menuId,
        menuName: menuName,
        menuImage: menuImage,
        menuDescription: menuDescription,
        customerId: verifyToken(req.body.token).user_id,
        quantity: quantity,
        price: price,
        managerId: managerId,
        facilityName: facilityName,
      });
      res.status(201).json({
        msg: "Item Added to cart successfull!",
        item: rm,
      });
    } else {
      //delete
      await Cart.deleteMany({
        managerId: { $ne: managerId },
        ipAddress: getMyIp(req),
      });

      const itemExists = await Cart.findOne({
        menuId: menuId,
        ipAddress: getMyIp(req),
      });

      if (itemExists) {
        return res
          .status(409)
          .send({ msg: "Item already exists in the cart." });
      }

      const rm = await Cart.create({
        menuId: menuId,
        menuName: menuName,
        menuImage: menuImage,
        menuDescription: menuDescription,
        ipAddress: getMyIp(req),
        quantity: quantity,
        price: price,
        managerId: managerId,
        facilityName: facilityName,
      });
      res.status(201).json({
        msg: "Item Added to cart successfull!",
        item: rm,
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/update/", async (req, res) => {
  const { quantity, id } = req.body;
  try {
    if (req.body?.token && verifyToken(req.body?.token)) {
      await Cart.updateOne(
        { _id: id, customerId: verifyToken(req.body.token).user_id },
        {
          quantity: quantity,
        }
      );
      res.status(201).json({
        msg: "Cart Item Updated successfull!",
      });
    } else {
      await Cart.updateOne(
        { _id: id, ipAddress: getMyIp(req) },
        {
          quantity: quantity,
        }
      );
      res.status(201).json({
        msg: "Cart Item Updated successfull!",
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/delete/", async (req, res) => {
  const { id } = req.body;
  try {
    if (req.body?.token && verifyToken(req.body?.token)) {
      await Cart.deleteOne({
        _id: id,
        customerId: verifyToken(req.body.token).user_id,
      });
      res.status(201).json({
        msg: "Cart Item Deleted successfull!",
      });
    } else {
      await Cart.deleteOne({ _id: id, ipAddress: getMyIp(req) });
      res.status(201).json({
        msg: "Cart Item Deleted successfull!",
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = router;
