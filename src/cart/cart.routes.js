import { Router } from "express";
import { addToCart, checkout, listCarts } from "./cart.controller.js";
import { addToCartValidator, checkoutValidator, requireAuth } from "../middlewares/cart-validator.js";

const router = Router();

/**
 * @swagger
 * /carts/addToCart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item added to cart
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/addToCart", addToCartValidator, addToCart);

/**
 * @swagger
 * /carts/checkout:
 *   post:
 *     summary: Checkout the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethod:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Checkout successful
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/checkout", checkoutValidator, checkout);

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: List all carts
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: List of carts
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", requireAuth, listCarts);

export default router;