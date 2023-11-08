import { DefaultAttribs } from "./globals";

export interface IProduct extends DefaultAttribs {
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	quantity: number;
}

export interface IProductCreation {
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	quantity: number;
}
