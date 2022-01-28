const express = require("express");
const {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenIsAdmin,
} = require("../middleware/verifyToken");

const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
} = require("../controller/productController");
const router = express.Router();

router
  .route("/")
  .post(verifyTokenIsAdmin, addProduct)
  .get(verifyTokenAndUser, getAllProducts);
router
  .route("/:id")
  .put(verifyTokenIsAdmin, updateProduct)
  .delete(verifyTokenIsAdmin, deleteProduct)
  .get(verifyTokenAndUser, getProduct);

module.exports = router;
