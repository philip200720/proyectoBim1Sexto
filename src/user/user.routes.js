import { Router } from "express";
import { deleteUser, getUsers, updateUser } from "./user.controller.js";
import { deleteUserValidator, listValidator, updateUserValidator } from "../middlewares/user-validator.js"


const router = Router()

router.post("/createUser",)

router.get("/", listValidator, getUsers)

router.put("/updateUser", updateUserValidator, updateUser)

router.delete("/deleteUser", deleteUserValidator, deleteUser)

export default router