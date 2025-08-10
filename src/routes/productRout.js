const express = require("express");
const {
  addProduct,
  getProduct,
  deleteProduct,
  showAllProducts,
} = require("../controllers/productController");
const uploader = require("../middlewares/multerMiddleware");

const productRouter = express.Router();

productRouter.post("/", uploader.single("productImage"), addProduct);
productRouter.get("/", showAllProducts);
productRouter.get("/:id", getProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
