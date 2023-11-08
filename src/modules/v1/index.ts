import { Router } from "express";
import usersRoutes from "./user/user.routes";
import productsRoutes from "./product/product.routes";

import { createError } from "../common/utils";

const router = Router();

// router.get('/api', async (req, res, next) => {
//   return res.json({
//     status: true,
//     message: 'Test API limiter',
//   })
// });

router.use("/auth", usersRoutes);
router.use("/products", productsRoutes);

router.all("*", (req, res, next) => {
	return next(createError("Resource Not Found", 404));
});

export default router;
