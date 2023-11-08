import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
	{
		name: {
			type: String
		},
		description: {
			type: String
		},
		price: {
			type: Number,
			get: (v: number) => v / 100,
			set: (v: number) => v * 100
		},
		imageUrl: {
			type: String
		},
		quantity: {
			type: Number
		},
		attributes: {
			type: Map
		},
		meta: {
			type: Map
		}
	},
	{ timestamps: true }
);

const Product = mongoose.model("product", productSchema);

export default Product;
