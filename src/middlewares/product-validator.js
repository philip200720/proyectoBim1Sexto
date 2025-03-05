import { body, param } from "express-validator";
import { validateFields } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { handleErrors } from "./handleErrors.js";
import { categoryExists } from "../helpers/db-validators.js";

export const createProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Product name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("stock").isInt({ min: 0 }).withMessage("Stock must be a positive number"),
    body("category").isMongoId().withMessage("Not a valid MongoDB ID"),
    body("productPicture").notEmpty().withMessage("Product picture is required"),
    validateFields,
    handleErrors
];

export const findProductByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("id").notEmpty().withMessage("Product name is required"),
    body("id").isMongoId().withMessage("Not a valid MongoDB ID"),
    validateFields,
    handleErrors
];

export const categoryIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    param("categoryId")
        .isMongoId().withMessage("Not a valid MongoDB ID")
        .custom(categoryExists),
    validateFields,
    handleErrors
];

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("Not a valid MongoDB ID"),
    body("name").optional().isString().withMessage("Name must be a string"),
    body("description").optional().isString().withMessage("Description must be a string"),
    body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a positive integer"),
    body("productPicture").optional().isString().withMessage("Product picture must be a string"),
    validateFields,
    handleErrors
];

export const getByNameValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    body("name").notEmpty().withMessage("Product name is required"),
    validateFields
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("Invalid product ID"),
    validateFields,
    handleErrors
];

export const requireAuth = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validateFields,
    handleErrors
];