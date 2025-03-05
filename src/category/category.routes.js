import { Router } from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "./category.controller.js";
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator, requireAuth } from "../middlewares/category-validator.js";

const router = Router();

/**
 * @swagger
 * /categories/createCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       500:
 *         description: Category creation failed
 */
router.post("/createCategory", createCategoryValidator, createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error retrieving categories
 */
router.get("/", requireAuth, getCategories);

/**
 * @swagger
 * /categories/updateCategory/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       500:
 *         description: Error updating category
 */
router.put("/updateCategory/:id", updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /categories/deleteCategory/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       500:
 *         description: Error deleting category
 */
router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory);

export default router;
