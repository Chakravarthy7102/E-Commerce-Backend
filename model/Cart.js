const mongoose = require("mongoose");

const Cart = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    products: [
      {
        productId: {
          type: String,
          require: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const CartSchema = mongoose.model("Cart", Cart);

module.exports = CartSchema;
