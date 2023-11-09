import config from "./config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import compression from "compression";
import mongoose from "mongoose";
import { createMongoDBConnection } from "./config/mongoose";

import routes from "./routes";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./modules/common/utils";

const app = express();

const { PORT, NODE_ENV, DATABASE_URL } = config;
const morganConfig = NODE_ENV === "development" ? "dev" : "tiny";

app.use(
	morgan(morganConfig),
	rateLimit({
		windowMs: 5 * 60 * 1000, // 10 minutes
		max: 5000, // limit each IP to 5000 requests per windowMs
		message: "Too many request from this IP, please try again after 10 minutes"
	}),
	cors({
		origin: (_origin, callback) => {
			callback(null, true);
		},
		credentials: true
	}),
	helmet(),
	compression(),
	express.urlencoded({ extended: true, limit: "10mb" }),
	express.json({ limit: "10mb" }),
	routes,
	errorHandler
);

app.disable("x-powered-by");

/* export default app;

// Start the server

// connect to mongodb
// eslint-disable-next-line max-len
mongoose
	.connect(DATABASE_URL)
	.then(() => {
		console.log("Database connected!");
		// console.log(`Connected to database: ${process.env.DB_NAME}`);
	})
	.catch(err => console.log("Failed to connect to database:", err.message));

process.on("unhandledRejection", reason => {
	console.log(`UNHANDLED-REJECTION: ${reason}`);
});

process.on("uncaughtException", reason => {
	console.log(`UNHANDLED-EXCEPTION: ${reason}`);
});

app.listen(PORT || 2005, () => {
	console.log(`Environment is ${NODE_ENV}`);
	console.log(`Server started on port: ${PORT}`);
}); */

// Start the server
const main = async () => {
	try {
		await createMongoDBConnection();

		app.listen(PORT || 2005, () => {
			console.log(`Environment is ${NODE_ENV}`);
			console.log(`Server started on port: ${PORT}`);
		});
	} catch (error) {
		throw error;
	}
};

export default main;
