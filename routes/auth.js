const express = require("express");
const router = express.Router();
const User = require("../model/UsersModel");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  const { username, email, isAdmin, password: rawPassword } = req.body;

  if (!username && !email && !rawPassword) {
    res
      .status(300)
      .json({ status: "error", msg: "Require all the credentials" });
    return;
  }

  const password = await bycrypt.hash(rawPassword, 10);

  try {
    const user = await User.create({
      username,
      email,
      isAdmin,
      password,
    });
    res.status(200).json({ status: "ok", msg: "user created", user: user });
  } catch (err) {
    res.status(500).json({ status: "error", msg: "Internal Error" });
  }
});

//login

router.post("/login", async (req, res) => {
  const { username, password: rawPassword } = req.body;

  if (username) {
    try {
      const user = await User.findOne({ username });
      //decrypt password
      const password = await bycrypt.compare(rawPassword, user.password);

      if (!password) {
        res
          .status(300)
          .json({ status: "error", msg: "Wrong Usernme or Password" });
        return;
      }
      const token = jwt.sign(
        {
          user: username,
          id: user._id,
          isAdmin: user.isAdmin,
          password: user.password,
        },
        process.env.SECRET,
        { expiresIn: "1d" }
      );
      const { password: hashed, ...restInfo } = user._doc;
      res.status(200).json({
        status: "ok",
        msg: "Youre Logged In",
        info: restInfo,
        token: token,
      });
    } catch (error) {
      res.status(404).json({ status: "error", error: " User not Found" });
    }
  }
});

module.exports = router;
