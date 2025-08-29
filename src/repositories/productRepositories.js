const Product = require("../schemas/productSchema");

async function createProduct(productDetails) {
  try {
    const response = await Product.create(productDetails);
    return response;
  } catch (error) {
    console.log(error);
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

async function getAllProducts() {
  const response = await Product.find({});
  return response;
}

async function getProductById(productId) {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    console.log(error);
  }
}

async function deleteProductById(productId) {
  try {
    const response = await Product.findByIdAndDelete(productId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
};
