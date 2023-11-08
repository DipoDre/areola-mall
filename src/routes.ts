import { Router } from "express";
import v1 from "./modules/v1";
import { createError } from "./modules/common/utils";

const router = Router();

// Controllers
router.use("/v1", v1);

router.all("*", (req, res, next) => {
	return next(createError("Resource Not Found", 404));
});

export default router;
