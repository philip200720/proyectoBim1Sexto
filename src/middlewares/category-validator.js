import { body, param } from "express-validator";
import { validateFields } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRole } from "./validate-roles.js";
import { handleErrors } from "./handleErrors.js";

export const createCategoryValidator = [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Category name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("description").isString().withMessage("Description must be a string"),
    validateFields,
    handleErrors
];

export const updateCategoryValidator = [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("Not a valid MongoDB ID"),
    body("name").optional().isString().withMessage("Name must be a string"),
    body("description").optional().isString().withMessage("Description must be a string"),
    validateFields,
    handleErrors
];

export const deleteCategoryValidator = [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("Not a valid MongoDB ID"),
    validateFields,
    handleErrors
];