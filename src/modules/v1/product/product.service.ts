import { IProductCreation } from "../../../types";
import Product from "../../../database/models/product";

export default class ProductService {
	// Get all Products
	getProducts = async () => {
		const products = await Product.find();
		return products;
	};

	// Find a Product
	findProduct = async (id: string) => {
		const product = await Product.findById(id);
		return product;
	};

	// Find a Product by Name
	findProductByName = async (name: string) => {
		const product = await Product.findOne({
			name
		});
		return product;
	};

	// Create a Product
	createProduct = async (data: IProductCreation) => {
		const product = await Product.create(data);
		return product;
	};

	// Update a Product
	updateProduct = async (productId: string, data: any) => {
		const product = await Product.findByIdAndUpdate(productId, data, {
			new: true
		});
		return product;
	};

	// Delete a Product
	deleteProduct = async (productId: string) => {
		const deletionMeta = await Product.findByIdAndDelete(productId);
		return deletionMeta;
	};
}
