import { getProducts } from "../controllers/productController.js";
import express, { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";

const gamesRouter = express.Router();

gamesRouter.use(validateAuth);
gamesRouter.get("/games", getProducts);

export default gamesRouter;
