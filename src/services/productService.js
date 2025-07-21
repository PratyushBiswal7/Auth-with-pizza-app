const { cloudinary } = require("../config/coludinaryConfig");
const ProductRepositories = require("../repositories/productRepositories");
const fs = require("fs/promises");

async function createProduct(productDetails) {
  const imagePath = productDetails.imagePath;
  if (imagePath) {
    try {
      const cloudinaryResponce = await cloudinary.uploader.upload(imagePath);
      var productImage = cloudinaryResponce.secure_url;
      await fs.unlink(imagePath);
    } catch (error) {
      console.log(error);
      throw { reason: "Can not uplaod the image", statusCode: 500 };
    }
  }

  const product = await ProductRepositories.createProduct({
    ...productDetails,
    productImage: productImage,
  });

  if (!product) {
    throw { reason: "Not able to create the Product", statusCode: 500 };
  }
}

module.exports = {
  createProduct,
};
