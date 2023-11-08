import UserService from "./user.service";
import { hash, decrypt } from "../../common/hashes";
import { createError, success, AuthenticateUser } from "../../common/utils";

import { IUserCreation, AuthenticatedRequest } from "../../../types";
import { NextFunction, Response } from "express";

// Create a User
const createUser = async (req: any, res: Response, next: NextFunction) => {
	try {
		const newUser: IUserCreation = req.body;

		const lowerCasedEmail = newUser.email.toLowerCase();
		const hashedPassword = hash(newUser.password);

		const userToCreate: IUserCreation = {
			...newUser,
			email: lowerCasedEmail,
			password: hashedPassword
		};

		const userService = new UserService();
		const user = await userService.findUser(userToCreate.email);

		if (user) {
			throw createError("Email exist", 400);
		}
		const createdUser = await userService.createUser(userToCreate);

		const { email } = createdUser;
		const userDetails = { email };

		return res
			.status(201)
			.json(
				success(
					"User was created successfully. Proceed to Log In.",
					userDetails
				)
			);
	} catch (error) {
		return next(error);
	}
};

// Log in User
const loginUser = async (req: any, res: Response, next: NextFunction) => {
	try {
		const inputEmail: string = req.body.email;
		const inputPassword: string = req.body.password;

		const userEmail = inputEmail.toLowerCase();

		const user = await new UserService().findUser(userEmail).catch(e => {
			throw e;
		});

		if (!user) {
			throw createError("Invalid credentials", 400);
		}

		const isValidPassword = decrypt(inputPassword, user.password as string);

		if (!isValidPassword) {
			throw createError("Invalid credentials", 400);
		}

		const { firstName, lastName, id, email } = user;

		const userDetails = { firstName, id, email };

		const token = AuthenticateUser({
			id,
			firstName,
			lastName,
			email
		});

		return res
			.status(200)
			.json(success("Login successful", userDetails, { token }));
	} catch (e) {
		return next(e);
	}
};

export default {
	createUser,
	loginUser
};
