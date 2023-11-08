import { IUserCreation } from "../../../types";
import User from "../../../database/models/user";

export default class UserService {
	// Find a User
	findUser = async (email: string) => {
		const user = await User.findOne({
			email
		});
		return user;
	};

	// Create a User
	createUser = async (data: IUserCreation) => {
		const user = await User.create(data);
		return user;
	};
}
