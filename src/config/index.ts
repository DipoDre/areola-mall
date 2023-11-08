/* eslint-disable max-len */
import dotenv from "dotenv";

dotenv.config();

const config = {
	PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
	DATABASE_URL: process.env.DATABASE_URL,
	AUTH_SECRET: process.env.AUTH_SECRET
};

export default config;
