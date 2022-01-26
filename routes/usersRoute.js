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
} = require("../controller/userController");

router
  .route("/:id")
  .put(verifyTokenAndUser, updateUser)
  .delete(verifyTokenAndUser, deleteUser)
  .get(verifyTokenIsAdmin, getUser);

router.route("/users").get(verifyTokenIsAdmin, getAllUsers);

module.exports = router;
