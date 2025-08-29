const Cart = require("../schemas/cartSchema");
const InternalServerError = require("../utils/internalServerError");

async function createCart(userId) {
  try {
    const newCart = await Cart.create({ user: userId });
    console.log("created", newCart);
    return newCart;
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessageList = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });
      throw new BadRequestError(errorMessageList);
    }

    console.log(error);
    throw new InternalServerError();
  }
}

async function getCartByUserId(userId) {
  try {
    const cart = await Cart.findOne({ user: userId });
    return cart;
  } catch (error) {
    console.log(error);
    throw new InternalServerError();
  }
}

module.exports = { createCart, getCartByUserId };
