import express from "express";
import {
    updateInvoice,
    listInvoices,
    getInvoicesByUserId,
    getInvoiceProducts
} from "./invoice.controller.js";
import {
    validateUserId,
    requireAuth,
    updateInvoiceValidator
} from "../middlewares/invoice-validator.js";

const router = express.Router();

/**
 * @swagger
 * /invoices/updateInvoice/{invoiceId}:
 *   put:
 *     summary: Update an invoice
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         schema:
 *           type: string
 *         required: true
 *         description: The invoice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *       500:
 *         description: Error updating invoice
 */
router.put("/updateInvoice/:invoiceId", updateInvoiceValidator, updateInvoice);

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: List all invoices
 *     tags: [Invoice]
 *     responses:
 *       200:
 *         description: List of invoices
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error retrieving invoices
 */
router.get("/", requireAuth, listInvoices);

/**
 * @swagger
 * /invoices/findInvoice/{userId}:
 *   get:
 *     summary: Get invoices by user ID
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of invoices for the user
 *       404:
 *         description: No invoices found for this user
 *       500:
 *         description: Error retrieving invoices by user ID
 */
router.get("/findInvoice/:userId", validateUserId, getInvoicesByUserId);

/**
 * @swagger
 * /invoices/{invoiceId}/products:
 *   get:
 *     summary: Get products in an invoice
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         schema:
 *           type: string
 *         required: true
 *         description: The invoice ID
 *     responses:
 *       200:
 *         description: List of products in the invoice
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Error retrieving invoice products
 */
router.get("/:invoiceId/products", requireAuth, getInvoiceProducts);

export default router;