const { getCartById } = require("../controllers/cartController");

const express = require("express");

const cartRouter = express.Router();

cartRouter.get("/:id", getCartById);

module.exports = cartRouter;