const mongoose = require("mongoose");

const Products = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Product name is required "],
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      require: [true, "Email is Required"],
      trim: true,
    },
    img: {
      type: String,
      require: true,
    },
    category: {
      type: Array,
      require: true,
    },
    size: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const ProductsSchema = mongoose.model("Products", Products);

module.exports = ProductsSchema;
