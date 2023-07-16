import { Router } from "express";
import authRouter from "./authRouter.js";
import cartRouter from "./cartRouter.js";
import gamesRouter from "./productRouter.js";

const router = Router();

router.use(authRouter);
router.use(gamesRouter);
router.use(cartRouter);

export default router;
