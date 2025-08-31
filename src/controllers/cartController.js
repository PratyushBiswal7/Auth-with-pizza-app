const { getCart, ModifyCart } = require("../services/cartService");
const AppError = require("../utils/AppError");

async function getCartByUser(req, res) {
  try {
    const cart = await getCart(req.user.id);
    return res.status(200).json({
      success: true,
      message: "Successfully fetched the cart",
      error: {},
      data: cart,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        error: error,
        data: {},
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
      data: {},
    });
  }
}

async function ModifyProductToCart(req, res) {
  try {
    const cart = await ModifyCart(
      req.user.id,
      req.params.productId,
      req.params.operation == "add"
    );
    return res.status(200).json({
      success: true,
      message: "Successfully added product to the cart",
      error: {},
      data: cart,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        error: error,
        data: {},
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
      data: {},
    });
  }
}

module.exports = { getCartByUser, ModifyProductToCart };
