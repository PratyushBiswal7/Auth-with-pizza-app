const { createProduct } = require("../services/productService");

async function addProduct(req, res) {
  try {
    const product = await createProduct({
      productName: req.body.productName,
      discription: req.body.discription,
      productImage: req.file.path,
      price: req.body.price,
      catagory: req.body.catagory, // if catagory undefined veg will stored, because of default value
      inStock: req.body.inStock, // if inStock is undefined true will stored, because of defalut value
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created a product",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      success: false,
      message: error.reason,
      data: {},
      error: error,
    });
  }
}

module.exports = { addProduct };
