import { Router } from "express"
import { register, login } from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middlewares/user-validator.js"

const router = Router()

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               adress:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User has been created
 *       500:
 *         description: User registration failed
 */
router.post("/register", registerValidator, register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Login failed, server error
 */
router.post("/login", loginValidator, login)

export default router