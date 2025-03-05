// product.routes.js
import { Router } from "express";
import {
    createProductValidator,
    updateProductValidator,
    deleteProductValidator,
    findProductByIdValidator,
    categoryIdValidator,
    requireAuth,
    getByNameValidator
} from "../middlewares/product-validator.js";
import { uploadProductPicture } from "../middlewares/multer-upload.js";
import {
    createProduct,
    getProductById,
    listProducts,
    getProductsByCategory,
    getTopSellingProducts,
    getOutOfStockProducts,
    getProductsStock,
    updateProduct,
    deleteProduct,
    getProductByName
} from "./product.controller.js";

const router = Router();

router.post("/createProduct", uploadProductPicture.single("productPicture"), createProductValidator, createProduct);
router.get("/:id", findProductByIdValidator, getProductById);
router.get("/", listProducts);
router.get("/productName/:name", getByNameValidator, getProductByName);
router.get("/categoryProducts/:categoryId", categoryIdValidator, getProductsByCategory);
router.get("/topSelling", requireAuth, getTopSellingProducts);
router.get("/outOfStock", requireAuth, getOutOfStockProducts);
router.get("/stock", requireAuth, getProductsStock);
router.put("/update/:id", uploadProductPicture.single("productPicture"), updateProductValidator, updateProduct);
router.delete("/delete/:id", deleteProductValidator, deleteProduct);

export default router;
