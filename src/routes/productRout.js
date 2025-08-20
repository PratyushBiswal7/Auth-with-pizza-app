const express = require("express");
const {
  addProduct,
  getProduct,
  deleteProduct,
  showAllProducts,
} = require("../controllers/productController");
const uploader = require("../middlewares/multerMiddleware");
const { isLoggedIn, isAdmin } = require("../Validators/authValidator");

const productRouter = express.Router();

productRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  uploader.single("productImage"),
  addProduct
);
productRouter.get("/", showAllProducts);
productRouter.get("/:id", getProduct);
productRouter.delete("/:id", isLoggedIn, isAdmin, deleteProduct);

module.exports = productRouter;
