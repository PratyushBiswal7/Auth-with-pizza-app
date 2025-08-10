const { cloudinary } = require("../config/coludinaryConfig");
const ProductRepositories = require("../repositories/productRepositories");
const fs = require("fs/promises");

async function createProduct(productDetails) {
  let productImage, cloudinaryPublicId;
  if (productDetails.imagePath) {
    try {
      const uploadResp = await cloudinary.uploader.upload(
        productDetails.imagePath
      );
      productImage = uploadResp.secure_url;
      cloudinaryPublicId = uploadResp.public_id;
      await fs.unlink(productDetails.imagePath);
    } catch (error) {
      throw { reason: "Cannot upload the image", statusCode: 500 };
    }
  }

  const { imagePath, ...rest } = productDetails;
  let product;
  try {
    product = await ProductRepositories.createProduct({
      ...rest,
      productImage,
      cloudinaryPublicId,
    });
    if (!product) throw new Error();
  } catch (error) {
    if (cloudinaryPublicId) {
      await cloudinary.uploader.destroy(cloudinaryPublicId);
    }
    throw { reason: "Not able to create the Product", statusCode: 500 };
  }
  return product;
}

async function getAllProducts() {
  try {
    const product = await ProductRepositories.getAllProducts();
    return product;
  } catch (error) {
    console.log(error);
  }
}

async function getProductById(productId) {
  const response = await ProductRepositories.getProductById(productId);
  if (!response) {
    throw { reason: "Not able to find the product", statusCode: 404 };
  }
  return response;
}

async function deleteProductById(productId) {
  const product = await ProductRepositories.getProductById(productId);
  if (!product) {
    throw { reason: "Product not found", statusCode: 404 };
  }

  if (product.cloudinaryPublicId) {
    try {
      await cloudinary.uploader.destroy(product.cloudinaryPublicId);
    } catch (err) {
      console.error("Error deleting image from Cloudinary:", err);
    }
  }

  const response = await ProductRepositories.deleteProductById(productId);
  if (response === null) {
    // This means nothing was deleted even though we found it a moment ago
    console.warn(
      "DeleteProductById: Returned null after finding product earlier!"
    );
  }

  return response;
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
};
