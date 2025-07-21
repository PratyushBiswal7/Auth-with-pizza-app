const { createProduct } = require("../services/productService");

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

module.exports = { addProduct };
