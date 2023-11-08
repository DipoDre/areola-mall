import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		email: {
			type: String
		},
		password: {
			type: String
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

const User = mongoose.model("user", userSchema);

export default User;
