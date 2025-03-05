import { Router } from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "./category.controller.js";
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator, requireAuth } from "../middlewares/category-validator.js";

const router = Router();

router.post("/createCategory", createCategoryValidator, createCategory);
router.get("/", requireAuth, getCategories);
router.put("/updateCategory/:id", updateCategoryValidator, updateCategory);
router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory);

export default router;