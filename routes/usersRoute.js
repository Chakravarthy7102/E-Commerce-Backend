const express = require("express");
const {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenIsAdmin,
} = require("../middleware/verifyToken");
const router = express.Router();

const {
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserStats,
} = require("../controller/userController");

router
  .route("/:id")
  .put(verifyTokenAndUser, updateUser)
  .delete(verifyTokenAndUser, deleteUser)
  .get(verifyTokenIsAdmin, getUser);

router.route("/").get(verifyTokenIsAdmin, getAllUsers);

router.route("/stats").get(verifyTokenIsAdmin, getUserStats);

module.exports = router;
