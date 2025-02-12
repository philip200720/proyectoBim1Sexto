import { body } from "express-validator"
import { emailExists, usernameExists } from "../helpers/db-validators.js"
import { validateFields } from "./validate-fields.js"
import { handleErrors } from "./handleErrors.js"


export const registerValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("surname").notEmpty().withMessage("Surname is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("username").custom(usernameExists),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Not a valid email"),
    body("email").custom(emailExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body("adress").notEmpty().withMessage("Adress is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    validateFields,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Not a valid email"),
    body("username").optional().isString().withMessage("Username is in the wrong format"),
    body("password").isLength({min: 4}).withMessage("Password must contain at least 8 characters"),
    validateFields,
    handleErrors
]