const mongoose = require("mongoose");

const Orders = new mongoose.Schema(
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
    amount: {
      type: Number,
      require: true,
    },
    address: {
      type: Object,
      require: true,
    },
    status: {
      type: String,
      default: "Pending..",
    },
  },
  { timestamps: true }
);

const OrdersSchema = mongoose.model("Orders", Orders);

module.exports = OrdersSchema;
