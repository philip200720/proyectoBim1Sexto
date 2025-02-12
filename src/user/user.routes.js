import { Router } from "express";
import { getUsers, updateUser } from "./user.controller.js";
import { listValidator, updateUserValidator } from "../middlewares/user-validator.js"


const router = Router()

router.get("/", listValidator, getUsers)

router.put("/updateUser", updateUserValidator, updateUser)

export default router