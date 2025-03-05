import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "./user.controller.js";
import { createUserValidator, deleteUserValidator, listValidator, updateUserValidator, requireAuth } from "../middlewares/user-validator.js";

const router = Router();

/**
 * @swagger
 * /users/createUser:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
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
 *         description: User creation failed
 */
router.post("/createUser", createUserValidator, createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error getting users
 */
router.get("/", listValidator, getUsers);

/**
 * @swagger
 * /users/updateUser:
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Error updating user
 */
router.put("/updateUser", updateUserValidator, updateUser);

/**
 * @swagger
 * /users/deleteUser:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Error deleting user
 */
router.delete("/deleteUser", deleteUserValidator, deleteUser);

/**
 * @swagger
 * /users/history:
 *   get:
 *     summary: Get user history
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User history retrieved successfully
 *       500:
 *         description: Error getting user history
 */
router.get("/history", requireAuth, deleteUser);

export default router;