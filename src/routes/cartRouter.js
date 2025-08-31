const {
  getCartByUser,
  ModifyProductToCart,
} = require("../controllers/cartController");

const express = require("express");
const { isLoggedIn } = require("../Validators/authValidator");

const cartRouter = express.Router();

cartRouter.get("/", isLoggedIn, getCartByUser);
cartRouter.post("/:operation/:productId", isLoggedIn, ModifyProductToCart);

module.exports = cartRouter;
