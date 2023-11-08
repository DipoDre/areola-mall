import { Request, NextFunction } from "express";
import { IUser, IAuthUser } from "./user";

export type AnyObject = {
	[key: string]: any;
};

export type AppError = Error & {
	code?: number;
	validations?: object | null;
	errorDetails?: object | null;
};

export type TRouteHandler<R = any> = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => Promise<R>;

export type CreateErr = (
	message: string,
	code?: number,
	validations?: object,
	errorDetails?: object
) => AppError;

export type ExcludedAttribs = "id" | "createdAt" | "updatedAt" | "deletedAt";

export interface DefaultAttribs {
	id: string;
	cursor?: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

export interface ResObject<T = any> {
	data?: T;
	message: string;
	status: boolean;
	meta?: AnyObject;
	error?: {
		code: string;
		data: AnyObject;
	};
}

export type AuthenticatedRequest = Request & {
	user: IAuthUser;
	destination?: {
		method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
		url: string;
	};
};

export type Fix = any;
