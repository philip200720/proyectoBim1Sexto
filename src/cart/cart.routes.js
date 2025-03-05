import { Router } from "express";
import { addToCart, checkout, listCarts } from "./cart.controller.js";
import { addToCartValidator, checkoutValidator, requireAuth } from "../middlewares/cart-validator.js";

const router = Router();

router.post("/addToCart", addToCartValidator, addToCart);

router.post("/checkout", checkoutValidator, checkout);

router.get("/", requireAuth, listCarts);

export default router;