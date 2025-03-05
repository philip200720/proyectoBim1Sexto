
import { handleErrors } from "./handleErrors.js";
import { validateFields } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { productExists } from "../helpers/db-validators.js";


export const checkoutValidator = [
  validateJWT,
  hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
  validateFields,
  handleErrors
];

export const requireAuth = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validateFields,
    handleErrors
];

export const addToCartValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    body("product").notEmpty().withMessage("Product is required").custom(productExists),
    validateFields,
    validateJWT
]