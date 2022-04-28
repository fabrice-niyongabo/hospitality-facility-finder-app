const express = require("express");
const router = express.Router();

const Users = require("../model/users");

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
        token: user.token,
        phone,
        fullName,
      });
    }
    res.status(400).send({ msg: "Wrong username or password" });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: "Something went wrong while signing into your account. Try again later",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    // Get user input
    const { fullName, email, password, phone } = req.body;

    // Validate user input
    if (!(email && password && fullName && phone)) {
      res.status(400).send({
        status: "Error",
        msg: "Provide correct info",
      });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Users.findOne({ email, username });

    if (oldUser) {
      return res.status(409).send({ msg: "User Already Exist. Please Login" });
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
        createdAt: user.createdAt,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json({
      status: "success",
      msg: "User created successfull!",
      phone,
      fullName,
      token: user.token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: "Something went wrong while creating your account. Try again later",
    });
  }
});

module.exports = router;
