const {
  createProduct,
  getProductById,
  deleteProductById,
  getAllProducts,
} = require("../services/productService");
const AppError = require("../utils/appError");

async function addProduct(req, res) {
  try {
    const product = await createProduct({
      ...req.body,
      imagePath: req.file && req.file.path,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created a product",
      data: product,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.reason || error.message,
      data: {},
      error,
    });
  }
}

async function showAllProducts(req, res) {
  try {
    const products = await getAllProducts();
    return res.status(200).json({
      success: true,
      message: "Successfully fetched all products.",
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Could not fetch products",
      data: [],
      error,
    });
  }
}

async function getProduct(req, res) {
  try {
    const response = await getProductById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Successfully fetched the product.",
      error: {},
      data: response,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.reason || error.message,
        data: {},
        error,
      });
    }
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.reason || error.message,
      data: {},
      error,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const response = await deleteProductById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Successfully deleted the product and its image.",
      error: {},
      data: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.reason || "Failed to delete product",
      data: {},
      error,
    });
  }
}

module.exports = { addProduct, showAllProducts,getProduct, deleteProduct };
