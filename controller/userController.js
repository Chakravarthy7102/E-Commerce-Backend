const bcrypt = require("bcryptjs");
const UserSchema = require("../model/UsersModel");

const updateUser = async (req, res) => {
  const user = req.body;
  const { id: userId } = req.params;
  const query = { _id: userId };
  const { password } = req.body;

  if (password) {
    password = await bcrypt.hash(password, 10);
  }

  try {
    const updatedUser = await UserSchema.findByIdAndUpdate(
      query,
      {
        $set: user,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).json({ status: "ok", msg: updatedUser });
  } catch (error) {
    res.status(501).json({ status: "error", error: "cannot update the user" });
  }
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;

  try {
    const deleted = await UserSchema.findOneAndDelete({ _id: userId });
    if (deleted) {
      res
        .status(200)
        .json({ status: "ok", msg: "User deleted Succesfully", obj: deleted });
    } else {
      res.status(404).json({ status: "error", msg: "user not found" });
    }
  } catch (error) {
    res.status(501).json({ status: "error", error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserSchema.find();
    if (users) {
      res.status(200).json({ status: "ok", obj: deleted });
    } else {
      res.status(404).json({ status: "error", msg: "users not found" });
    }
  } catch (error) {
    res.status(501).json({ status: "error", error: error });
  }
};

const getUser = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const user = await UserSchema.findOne({ _id: userId });
    if (user) {
      res.status(200).json({ status: "ok", obj: user });
    } else {
      res.status(404).json({ status: "error", msg: "user not found" });
    }
  } catch (error) {
    res.status(501).json({ status: "error", error: error });
  }
};

module.exports = { updateUser, deleteUser, getAllUsers, getUser };
