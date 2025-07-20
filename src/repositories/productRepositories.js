const Product = require("../schemas/productSchema");

async function createProduct(productDetails) {
  try {
    const responce = await Product.create(productDetails);
    return responce;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createProduct };
