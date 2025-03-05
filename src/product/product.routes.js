import { Router } from "express";
import {
    createProductValidator,
    updateProductValidator,
    deleteProductValidator,
    findProductByIdValidator,
    categoryIdValidator,
    requireAuth,
    getByNameValidator
} from "../middlewares/product-validator.js";
import { uploadProductPicture } from "../middlewares/multer-upload.js";
import {
    createProduct,
    getProductById,
    listProducts,
    getProductsByCategory,
    getTopSellingProducts,
    getOutOfStockProducts,
    getProductsStock,
    updateProduct,
    deleteProduct,
    getProductByName
} from "./product.controller.js";

const router = Router();

/**
 * @swagger
 * /products/createProduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *               productPicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Product creation failed
 */
router.post("/createProduct", uploadProductPicture.single("productPicture"), createProductValidator, createProduct);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error getting product by ID
 */
router.get("/:id", findProductByIdValidator, getProductById);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: List all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Error getting products
 */
router.get("/", listProducts);

/**
 * @swagger
 * /products/productName/{name}:
 *   get:
 *     summary: Get product by name
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The product name
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error retrieving product by name
 */
router.get("/productName/:name", getByNameValidator, getProductByName);

/**
 * @swagger
 * /products/categoryProducts/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: List of products in the category
 *       500:
 *         description: Error getting products by category
 */
router.get("/categoryProducts/:categoryId", categoryIdValidator, getProductsByCategory);

/**
 * @swagger
 * /products/topSelling:
 *   get:
 *     summary: Get top selling products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of top selling products
 *       500:
 *         description: Error getting top selling products
 */
router.get("/topSelling", requireAuth, getTopSellingProducts);

/**
 * @swagger
 * /products/outOfStock:
 *   get:
 *     summary: Get out of stock products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of out of stock products
 *       500:
 *         description: Error getting out of stock products
 */
router.get("/outOfStock", requireAuth, getOutOfStockProducts);

/**
 * @swagger
 * /products/stock:
 *   get:
 *     summary: Get product stock
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of product stock
 *       500:
 *         description: Error getting product stock
 */
router.get("/stock", requireAuth, getProductsStock);

/**
 * @swagger
 * /products/update/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *               productPicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       500:
 *         description: Error updating product
 */
router.put("/update/:id", uploadProductPicture.single("productPicture"), updateProductValidator, updateProduct);

/**
 * @swagger
 * /products/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       500:
 *         description: Error deleting product
 */
router.delete("/delete/:id", deleteProductValidator, deleteProduct);

export default router;