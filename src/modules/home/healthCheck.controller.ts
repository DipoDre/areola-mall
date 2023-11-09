import mongoose from "mongoose";
const { connection } = mongoose;
import { NextFunction, Response } from "express";

export const healthCheck = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		let serverHealth = {
			serverName: "Areola Mall Service",
			message: "Server is up and running",
			mongoAlive: false
		};

		if (connection.readyState === 1) serverHealth.mongoAlive = true;

		res.status(200).json(serverHealth);
	} catch (error) {
		console.log("ERROR-HEALTH: ", error);
		res.status(500).json({ message: "Error Occurred on server" });
	}
};
