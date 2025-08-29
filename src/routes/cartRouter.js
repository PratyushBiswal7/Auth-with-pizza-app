const { getCartByUser } = require("../controllers/cartController");

const express = require("express");

const cartRouter = express.Router();

cartRouter.get("/", getCartByUser);

module.exports = cartRouter;
