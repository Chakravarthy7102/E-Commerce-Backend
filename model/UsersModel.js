const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "User name is required "],
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      require: [true, "Email is Required"],
      trim: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserSchema = mongoose.model("User", User);

module.exports = UserSchema;
