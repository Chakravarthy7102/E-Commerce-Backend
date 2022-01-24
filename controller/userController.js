const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
const { verifyToken } = require("../middleware/verifyToken");
const UserSchema = require("../model/UsersModel");

const updateUser = async (req, res) => {
  const user = req.user;
  const { username, password, email } = req.body;

  if (password) {
    password = await bcrypt.hash(password, 10);
  }

  try {
    const updatedUser = await UserSchema.findByIdAndUpdate(
      user.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "ok", msg: updatedUser });
  } catch (error) {
    res.status(501).json({ status: "error", error: "cannot update the user" });
  }
};

module.exports = { updateUser };
