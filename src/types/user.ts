import { DefaultAttribs } from "./globals";

export interface IUser extends DefaultAttribs {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface IAuthUser {
	id?: string;
	email?: string;
	iat?: number;
	firstName?: string;
}

export interface IUserCreation {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
