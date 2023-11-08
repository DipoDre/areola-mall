import { Router } from "express";
import UserController from "./user.controllers";
import { validate, Authenticate } from "../../common/utils";
import UserValidator from "./user.validators";
const router = Router();

// Sign up a User
router.post(
	"/signup",
	UserValidator.signUpUserRules(),
	validate,
	UserController.createUser
);

// Log in User
router.post(
	"/login",
	UserValidator.loginUserRules(),
	validate,
	UserController.loginUser
);

export default router;
