const express = require("express");
const {
  verifyToken,
  verifyTokenAndUser,
} = require("../middleware/verifyToken");
const router = express.Router();

const { updateUser } = require("../controller/userController");

router.put("/:id", verifyTokenAndUser, updateUser);

module.exports = router;
