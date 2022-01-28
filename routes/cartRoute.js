const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenIsAdmin,
} = require("../middleware/verifyToken");

const {
  addCart,
  updateCart,
  deleteCart,
  getCart,
} = require("../controller/cartController");

router
  .route("/:userId")
  .put(verifyTokenIsAdmin, updateCart)
  .delete(verifyTokenIsAdmin, deleteCart)
  .get(verifyTokenAndUser, getCart)
  .post(verifyTokenAndUser, addCart);

module.exports = router;
