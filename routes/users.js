const express = require("express");
const users = require("../model/users");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send({ msg: "Please provide your email and password" });
    }
    // Validate if user exist in our database
    const user = await users.findOne({ email });

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
    res.status(400).send("Wrong username or password");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
