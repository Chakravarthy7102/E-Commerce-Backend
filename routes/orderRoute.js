const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenIsAdmin,
} = require("../middleware/verifyToken");

const { addOrder, deleteOrder, getOrder } = require("../controller/order");

router
  .route("/:userId")
  .post(verifyTokenAndUser, addOrder)
  .delete(verifyTokenAndUser, deleteOrder)
  .get(verifyTokenAndUser, getOrder);

router
  .route("/:userId")
  .delete(verifyTokenAndUser, deleteOrder)
  .get(verifyTokenAndUser, getOrder);

module.exports = router;
