import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  // getProductPhotoController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  singleProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
import braintree from "braintree";

const router = express.Router();

//CRAETE PRODUCT
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//GET PRODUCT
router.get("/get-product", getProductController);

//GET SINGLE PRODUCT
router.get("/single-product/:slug", singleProductController);

//get single pro using slug
router.get("/get-product/:slug", getSingleProductController);

//GET PHOTO
router.get("/product-photo/:pid", productPhotoController);

//photo by pid
// router.get("/product-photo/:id", getProductPhotoController);

//UPDATE
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//DELETE PRODUCT
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//FILTER
router.post("/product-filters", productFilterController);

//PAGINATION
router.get("/product-count", productCountController);

//LIST
router.get("/product-list/:page", productListController);

//serach product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-catgeory/:slug", productCategoryController);

//payment
router.get("/braintree/token", braintreeTokenController);

router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
