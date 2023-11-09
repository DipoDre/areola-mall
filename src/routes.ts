import { Router } from "express";
import v1 from "./modules/v1";
import { healthCheck } from "./modules/home/healthCheck.controller";
import { createError } from "./modules/common/utils";

const router = Router();

// Controllers
router.get("/", healthCheck);
router.use("/v1", v1);

router.all("*", (req, res, next) => {
	return next(createError("Resource Not Found", 404));
});

export default router;
