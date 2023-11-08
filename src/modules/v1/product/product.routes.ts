import { Router } from "express";
import productControllers from "./product.controllers";
import { validate, Authenticate } from "../../common/utils";
import ProductValidator from "./product.validators";
const router = Router();

// Get all products
router.get("/", Authenticate, validate, productControllers.getProducts);

// Find a Product
router.get(
	"/:productId",
	Authenticate,
	ProductValidator.getProductRules(),
	validate,
	productControllers.getProduct
);

// Create a Product
router.post(
	"/",
	Authenticate,
	ProductValidator.createProductRules(),
	validate,
	productControllers.createProduct
);

// Update a Product
router.put(
	"/:productId",
	Authenticate,
	ProductValidator.updateProductRules(),
	validate,
	productControllers.updateProduct
);

// Delete a Product
router.delete(
	"/:productId",
	Authenticate,
	ProductValidator.deleteProductRules(),
	validate,
	productControllers.deleteProduct
);

export default router;
