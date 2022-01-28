const bcrypt = require("bcryptjs");
const UserSchema = require("../model/UsersModel");

const updateUser = async (req, res) => {
  const user = req.body;
  const { password } = req.body;

  if (password) {
    password = await bcrypt.hash(password, 10);
  }

  try {
    const updatedUser = await UserSchema.findByIdAndUpdate(
      req.params.id,
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
    res.status(501).json({
      status: "error",
      error: error.codeName,
      res: "updateUser",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await UserSchema.findOneAndDelete(req.params.id);
    if (deleted) {
      res
        .status(200)
        .json({ status: "ok", msg: "User deleted Succesfully", obj: deleted });
    } else {
      res.status(404).json({ status: "error", msg: "user not found" });
    }
  } catch (error) {
    res.status(501).json({ status: "error", error: error, res: "DeleteUser" });
  }
};

const getAllUsers = async (req, res) => {
  //query for getting the latest users
  //url = https://domainname/user/users?new=true
  const query = req.query.new;
  try {
    const users = await UserSchema.find();

    res.status(200).json({ status: "ok", obj: users });
  } catch (error) {
    res.status(501).json({ status: "error", error: error, res: "getAllUsers" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await UserSchema.findOne(req.params.id);

    res.status(200).json({ status: "ok", obj: user });
  } catch (error) {
    res.status(501).json({ status: "error", error: error, res: "getUser" });
  }
};

//user stats

const getUserStats = async (req, res) => {
  const date = new Date();
  const lastyear = new Date(date.setFullYear(date.setFullYear() - 1));
  try {
    const data = await UserSchema.aggregate([
      { $match: { createdAt: { $gte: lastyear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: $month,
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ status: "ok", msg: data });
  } catch (err) {
    res.status(501).json({ status: "error", error: err, res: "getStats" });
  }
};
module.exports = { updateUser, deleteUser, getAllUsers, getUser, getUserStats };
