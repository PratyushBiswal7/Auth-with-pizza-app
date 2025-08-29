const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "PizzaAppUser",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1, default: 1 },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["ORDERED", "CANCELLED", "PROCESSING", "OUT_FOR_DELEVERY"],
      default: "ORDERED",
    },
    address: {
      type: String,
      minLength: [10, "Address should be minimum 10 characters long"],
    },
    paymentMethod: {
      type: String,
      enum: ["ONLINE", "CASH"],
      default: "ONLINE",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
