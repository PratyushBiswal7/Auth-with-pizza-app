const { getCartByUser } = require("../controllers/cartController");

const express = require("express");
const { isLoggedIn } = require("../Validators/authValidator");

const cartRouter = express.Router();

cartRouter.get("/",isLoggedIn, getCartByUser);

module.exports = cartRouter;
