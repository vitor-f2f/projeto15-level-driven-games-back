import express from "express";
import {
    addProduct,
    removeProduct,
    getCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/cart", addProduct);
cartRouter.delete("/cart", removeProduct);
cartRouter.get("/cart", getCart);

export default cartRouter;
