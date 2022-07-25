const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("../middleware/auth");

const Users = require("../model/users");
const Facility = require("../model/facility");

router.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send({ msg: "Please provide your email and password" });
    }
    // Validate if user exist in our database
    const user = await Users.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        {
          user_id: user._id,
          email,
          role: user.role,
          phone: user.phone,
          createdAt: user.createdAt,
          companyName: user.companyName,
          fullName: user.fullName,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json({
        phone: user.phone,
        email: user.email,
        fullName: user.fullName,
        companyName: user.companyName,
        role: user.role,
        token: user.token,
      });
    } else {
      res.status(400).send({ msg: "Wrong username or password" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: "Something went wrong while signing into your account. Try again later",
    });
  }
});

router.post("/updateInfo/", auth, (req, res) => {
  const { name, phone } = req.body;
  Users.updateOne(
    { _id: req.user.user_id },
    { fullName: name, phone },
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err.message });
      } else {
        res.status(200).send({ result });
      }
    }
  );
});

router.post("/updateToken/", auth, async (req, res) => {
  const { id } = req.body;
  try {
    const facility = await Facility.findOne({ _id: id });
    if (facility) {
      if (facility.mainManagerId != "none") {
        const user = await Users.findOne({ _id: facility.managerId });
        const realManager = await Users.findOne({
          _id: facility.mainManagerId,
        });
        if (user) {
          const token = jwt.sign(
            {
              user_id: user._id,
              email: realManager.email,
              role: realManager.role,
              phone: realManager.phone,
              createdAt: realManager.createdAt,
              companyName: realManager.companyName,
              fullName: realManager.fullName,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          return res.status(200).json({
            phone: user.phone,
            email: user.email,
            fullName: user.fullName,
            companyName: user.companyName,
            role: user.role,
            token,
          });
        } else {
          return res
            .status(400)
            .send({ msg: "Can not find the owner of this facility" });
        }
      } else {
        //real user
        const user = await Users.findOne({ _id: facility.managerId });
        if (user) {
          const token = jwt.sign(
            {
              user_id: user._id,
              email: user.email,
              role: user.role,
              phone: user.phone,
              createdAt: user.createdAt,
              companyName: user.companyName,
              fullName: user.fullName,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          return res.status(200).json({
            phone: user.phone,
            email: user.email,
            fullName: user.fullName,
            companyName: user.companyName,
            role: user.role,
            token,
          });
        } else {
          return res
            .status(400)
            .send({ msg: "Can not find the owner of this facility" });
        }
      }
    } else {
      return res.status(400).send({ msg: "Invalid Facility." });
    }
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

// admin
router.post("/userInfo/", auth, (req, res) => {
  const { i } = req.body;
  Users.find({ _id: i }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      return res.status(200).send({ result });
    }
  });
});
// admin

router.post("/updatePassword/", auth, async (req, res) => {
  const { newPwd, currentPwd } = req.body;
  try {
    const user = await Users.findOne({ _id: req.user.user_id });
    if (user && (await bcrypt.compare(currentPwd, user.password))) {
      encryptedPassword = await bcrypt.hash(newPwd, 10);
      Users.updateOne(
        { _id: req.user.user_id },
        { password: encryptedPassword },
        (err, result) => {
          if (err) {
            return res.status(400).send({ msg: err.message });
          } else {
            res.status(200).send({ result });
          }
        }
      );
    } else {
      res.status(400).send({ msg: "Wrong old password" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: "Something went wrong. Try again later",
    });
  }
});

router.post("/editInfo", auth, async (req, res) => {
  const { phone, fullName } = req.body;
  try {
    await Users.updateOne({ _id: req.user.user_id }, { phone, fullName });
    res.status(201).send({
      msg: "User info updated successfull!",
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/getAll/", auth, async (req, res) => {
  try {
    const users = await Users.find({ role: "user" });
    res.status(200).send({
      users,
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    // Get user input
    const {
      fullName,
      email,
      password,
      phone,
      createFacility,
      facilityName,
      facilityType,
      averagePrice,
      description,
    } = req.body;

    // Validate user input
    if (!(email && password && fullName && phone)) {
      res.status(400).send({
        status: "Error",
        msg: "Provide correct info",
      });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Users.findOne({ email, phone });

    if (oldUser) {
      return res
        .status(409)
        .send({ msg: "Email and phone number already exists." });
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await Users.create({
      fullName,
      phone,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      {
        user_id: user._id,
        email,
        fullName,
        role: user.role,
        phone: user.phone,
        companyName: user.companyName,
        createdAt: user.createdAt,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    if (createFacility) {
      const facility = await Facility.create({
        managerId: user._id,
        name: facilityName,
        type: facilityType,
        description: description,
        address: "",
        stars: "",
        averagePrice,
        lat: "",
        long: "",
        image: "",
        status: "inactive",
      });
      res.status(201).json({
        status: "success",
        msg: "Registered and applied for facility activation sucessfull!",
        phone,
        email,
        fullName,
        companyName: user.companyName,
        role: user.role,
        token: user.token,
      });
    } else {
      // return new user
      res.status(201).json({
        status: "success",
        msg: "User created successfull!",
        phone,
        email,
        fullName,
        companyName: user.companyName,
        role: user.role,
        token: user.token,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: err.message,
    });
  }
});

module.exports = router;
