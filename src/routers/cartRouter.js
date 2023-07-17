import express from "express";
import {
  addProduct,
  removeProduct,
  getCart,
} from "../controllers/cartController.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const cartRouter = express.Router();

cartRouter.use(validateAuth);
cartRouter.post("/cart", addProduct);
cartRouter.delete("/cart", removeProduct);
cartRouter.get("/cart", getCart);

export default cartRouter;
