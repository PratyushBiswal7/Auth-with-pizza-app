const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      minLength: [5, "Product name should be 5 characters long"],
      trim: true,
    },
    discription: {
      type: String,
      required: [true, "Product discription is required"],
    },
    productImage: {
      type: String, //link
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    catagory: {
      type: String,
      enum: ["veg", "non-veg", "drink", "side"],
      default: "veg",
    },
    inStock: {
      type: Boolean,
      required: [true, "In stock status is required"],
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
