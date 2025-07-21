const { cloudinary } = require("../config/coludinaryConfig");
const ProductRepositories = require("../repositories/productRepositories");
const fs = require("fs/promises");

async function createProduct(productDetails) {
  let productImage;
  if (productDetails.imagePath) {
    try {
      const uploadResp = await cloudinary.uploader.upload(
        productDetails.imagePath
      );
      productImage = uploadResp.secure_url;
      await fs.unlink(productDetails.imagePath);
    } catch (error) {
      throw { reason: "Can not upload the image", statusCode: 500 };
    }
  }
  // Remove imagePath from payload before saving to DB
  const { imagePath, ...rest } = productDetails;
  const product = await ProductRepositories.createProduct({
    ...rest,
    productImage,
  });
  if (!product)
    throw { reason: "Not able to create the Product", statusCode: 500 };
  return product;
}

module.exports = {
  createProduct,
};
