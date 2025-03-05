import { check, param } from "express-validator";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handleErrors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const requireAuth = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validateFields,
    handleErrors
];

export const updateInvoiceValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").optional().isMongoId().withMessage("Not a valid MongoDB ID"),
    validateFields,
    handleErrors
]

export const validateUserId = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("Not a valid MongoDB ID"),
    validateFields,
    handleErrors
];

export const validateInvoiceItems = [
    check("items.*.productId", "Invalid product ID").isMongoId(),
    check("items.*.quantity", "Quantity must be a positive number").isInt({ min: 1 }),
    validateFields,
    handleErrors
];