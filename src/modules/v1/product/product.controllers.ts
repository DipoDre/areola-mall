import ProductService from "./product.service";
import { Request, NextFunction, Response } from "express";
import { createError, success } from "../../common/utils";
import { IProductCreation } from "../../../types";

// Get a Product
const getProduct = async (req: any, res: Response, next: NextFunction) => {
	try {
		const { productId } = req.params;

		if (!productId) {
			throw createError("Invalid product id", 400);
		}

		const product = await new ProductService()
			.findProduct(productId)
			.catch(e => {
				throw e;
			});

		if (!product) {
			throw createError("Product not found", 400);
		}

		return res
			.status(200)
			.json(success("Product retrieved successfully", product));
	} catch (e) {
		return next(e);
	}
};

// Get all Products
const getProducts = async (req: any, res: Response, next: NextFunction) => {
	try {
		const products = await new ProductService().getProducts().catch(e => {
			throw e;
		});

		if (products.length < 1) {
			throw createError("Products were not found", 400);
		}

		return res
			.status(200)
			.json(success("Products retrieved successfully", products));
	} catch (error) {
		return next(error);
	}
};

// Create a Product
const createProduct = async (req: any, res: Response, next: NextFunction) => {
	try {
		const newProduct: IProductCreation = req.body;
		const lowerCasedProduct = newProduct.name.toLowerCase();
		const parsedPrice = Number.parseFloat(newProduct.price.toFixed(2));

		const productToCreate: IProductCreation = {
			...newProduct,
			name: lowerCasedProduct,
			price: parsedPrice
		};

		const productService = new ProductService();
		const product = await productService.findProductByName(
			productToCreate.name
		);

		if (product) {
			throw createError("Product name has been taken", 400);
		}
		const createdProduct = await productService.createProduct(productToCreate);

		const { id, name, price, quantity } = createdProduct;
		const productDetails = { id, name, price, quantity };

		return res
			.status(201)
			.json(success("Product was created successfully.", productDetails));
	} catch (error) {
		return next(error);
	}
};

// Update Product
const updateProduct = async (req: any, res: Response, next: NextFunction) => {
	try {
		const { productId } = req.params;
		const { description, price, imageUrl, quantity } = req.body;

		const productService = new ProductService();
		const product = await productService.findProduct(productId).catch(e => {
			throw e;
		});

		if (!product) {
			throw createError("Product not found", 400);
		}

		let updateData: any = { description, price, imageUrl, quantity };

		const updatedProduct = await productService
			.updateProduct(productId, updateData)
			.catch(e => {
				throw e;
			});

		/* if (updateInfo.modifiedCount !== 1) {
			throw createError("Product was not updated", 400);
		} */

		return res
			.status(200)
			.json(success("Product was updated successfully", updatedProduct.id));
	} catch (e) {
		return next(e);
	}
};

// Delete a Product
const deleteProduct = async (req: any, res: Response, next: NextFunction) => {
	try {
		const { productId } = req.params;

		const productService = new ProductService();
		const product = await productService.findProduct(productId).catch(e => {
			throw e;
		});

		if (!product) {
			throw createError("Product not found", 400);
		}

		const deletedProduct = await productService
			.deleteProduct(productId)
			.catch(e => {
				throw e;
			});

		/* if (deleteInfo.deletedCount < 1) {
			throw createError("Product was not deleted", 400);
		} */

		return res
			.status(200)
			.json(success("Product was deleted successfully", deletedProduct.id));
	} catch (error) {
		return next(createError(error.message, error.code));
	}
};

export default {
	getProduct,
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct
};
