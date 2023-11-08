import { body, query, param } from "express-validator";

const getProductRules = () => [
	param("productId").isMongoId().withMessage("Invalid Id")
];

const createProductRules = () => [
	body("name").isString().withMessage("productName must be a string"),
	body("description").isString().withMessage("productName must be a string"),
	body("price").isFloat({ min: 1.0 }).withMessage("Minimum price is 1.00"),
	body("imageUrl").isURL().withMessage("Invalid url"),
	body("quantity")
		.isInt({ allow_leading_zeroes: false, gt: 0 })
		.withMessage("Quantity must be greater than 0")
];

const updateProductRules = () => [
	param("productId").isMongoId().withMessage("Invalid Id"),
	body("description")
		.isString()
		.optional()
		.withMessage("productName must be a string"),
	body("price")
		.isFloat({ min: 1.0 })
		.optional()
		.withMessage("Minimum price is 1.00"),
	body("imageUrl").isURL().optional().withMessage("Invalid url"),
	body("quantity")
		.isInt({ allow_leading_zeroes: false, gt: 0 })
		.optional()
		.withMessage("Quantity must be greater than 0")
];

const deleteProductRules = () => [
	param("productId").isMongoId().withMessage("Invalid Id")
];

export default {
	getProductRules,
	createProductRules,
	updateProductRules,
	deleteProductRules
};
