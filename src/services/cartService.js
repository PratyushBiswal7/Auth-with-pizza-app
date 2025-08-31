const { getCartByUserId } = require("../repositories/cartRepository");
const AppError = require("../utils/AppError");
const BadRequestError = require("../utils/badRequestError");
const NotFoundError = require("../utils/notFoundError");
const { getProductById } = require("./productService");

async function getCart(userId) {
  const cart = await getCartByUserId(userId);
  if (!cart) {
    throw new NotFoundError([], "Cart");
  }
  return cart;
}

async function ModifyCart(userId, productId, shouldAdd = true) {
  const quantityValue = shouldAdd === true ? 1 : -1;
  const cart = await getCart(userId);
  const product = await getProductById(productId);
  if (!product) {
    throw new NotFoundError("Product");
  }
  if (!product.inStock || product.quantity <= 0) {
    throw new BadRequestError("Product not available in stock");
  }

  let foundProduct = false;
  cart.items.forEach((item) => {
    // Use String conversion for safe comparison
    if (String(item.product._id || item.product) === String(productId)) {
      if (shouldAdd) {
        if (product.quantity >= item.quantity + 1) {
          item.quantity += 1;
          product.quantity -= 1; // decrease when adding
        } else {
          throw new AppError(
            "The quantity of the product requested is unavailable",
            404
          );
        }
      } else {
        if (item.quantity > 0) {
          item.quantity -= 1;
          product.quantity += 1; // increase stock when removing
          if (item.quantity == 0) {
            cart.items = cart.items.filter(
              (item) => item.product._id != productId
            );
            foundProduct = true;
            return;
          }
        } else {
          throw new AppError("Cannot decrease less than 0", 404);
        }
      }
      foundProduct = true;
    }
  });

  if (!foundProduct) {
    if (shouldAdd) {
      cart.items.push({
        product: productId,
        quantity: 1,
      });
      product.quantity -= 1; // decrease for new item
    } else {
      throw new NotFoundError("Product in the cart");
    }
  }

  await cart.save();
  await product.save();

  return cart;
}

module.exports = { getCart, ModifyCart };
