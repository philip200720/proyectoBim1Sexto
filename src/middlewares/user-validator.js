import { body } from "express-validator"
import { emailExists, usernameExists } from "../helpers/db-validators.js"
import { validateFields } from "./validate-fields.js"
import { handleErrors } from "./handleErrors.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js";
import User from "../user/user.model.js"

const updateUserRoleValidation = async (req, res, next) => {
    try {
        const { usuario } = req
        const role = usuario.role
        const data = req.body

        if (role === "ADMIN_ROLE" && data.uid) {
            const user = await User.findById(data.uid)
            if (user.role === "ADMIN_ROLE") {
                return res.status(401).json({
                    success: false,
                    message: "Unable to edit other admins"
                })
            }
            return next()
        } else if (role === "CLIENT_ROLE") {
            if (data.uid) {
                return res.status(401).json({
                    success: false,
                    message: "Only admins are authorized to edit other users"
                })
            } else if (data.role) {
                return res.status(401).json({
                    success: false,
                    message: "Only admins are authorized to edit roles"
                })
            } else if (data.status) {
                return res.status(405).json({
                    success: false,
                    message: "Unable to switch status in update method"
                })
            }
            return next()
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating users",
            error: err.message
        })
    }
}

const deleteUserRoleValidation = async (req, res, next) => {
    try {
        const { usuario } = req
        const role = usuario.role
        const { uid } = req.body
        const user = await User.findById(uid)

        if (role === "ADMIN_ROLE" && uid) {
            if (user.status === false) {
                return res.status(401).json({
                    success: false,
                    message: "User is already deleted"
                })
            }
            if (user.role === "ADMIN_ROLE") {
                return res.status(401).json({
                    success: false,
                    message: "Unable to delete other admins"
                })
            }
            return next()
        } else if (role === "CLIENT_ROLE") {
            if (uid) {
                return res.status(401).json({
                    success: false,
                    message: "Only admins are authorized to delete other users"
                })
            }
            if (user.status === false) {
                return res.status(401).json({
                    success: false,
                    message: "User is already deleted"
                })
            }
            return next()
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error deleting users",
            error: err.message
        })
    }
}

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
        minLowercase: 1,
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
    body("password").isLength({ min: 4 }).withMessage("Password must contain at least 8 characters"),
    validateFields,
    handleErrors
]

export const createUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    body("surname").notEmpty().withMessage("Surname is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("username").custom(usernameExists),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Not a valid email"),
    body("email").custom(emailExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body("adress").notEmpty().withMessage("Adress is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    validateFields,
    handleErrors
]

export const listValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validateFields,
    handleErrors
]

export const updateUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    body("uid").optional().isMongoId().withMessage("Not a valid MongoDB ID"),
    updateUserRoleValidation,
    validateFields,
    handleErrors
]

export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    body("uid").optional().isMongoId().withMessage("Not a valid MongoDB ID"),
    deleteUserRoleValidation,
    validateFields,
    handleErrors
]

export const requireAuth = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    validateFields,
    handleErrors
];