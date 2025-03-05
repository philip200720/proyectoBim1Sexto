import Product from "./product.model.js";

export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        productData.productPicture = req.file.path
        
        const product = await Product.create(productData);
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Product creation failed",
            error: err.message
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        return res.status(200).json({ success: true, product });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error getting product by ID",
            error: err.message
        })
    }
}

export const listProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: true });
        return res.status(200).json({ success: true, products });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error getting products",
            error: err.message
        })
    }
}

export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ category: categoryId, status: true });
        return res.status(200).json({
            success: true,
            products
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error getting products by category",
            error: err.message
        })
    }
}

export const getTopSellingProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: true }).sort({ sold: -1 }).limit(3);
        return res.status(200).json({
            success: true,
            products
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error getting top selling products",
            error: err.message
        })
    }
}

export const getOutOfStockProducts = async (req, res) => {
    try {
        const products = await Product.find({ stock: 0, status: true });
        return res.status(200).json({
            success: true,
            products 
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error getting out of stock products",
            error: err.message
        })
    }
}

export const getProductsStock = async (req, res) => {
    try {
        const products = await Product.find({ status: true }).select("name stock");
        return res.status(200).json({
            success: true,
            products
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error getting product stock",
            error: err.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        if (req.file) updatedData.productPicture = req.file.path;
        
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            updatedProduct
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating product",
            error: err.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndUpdate(id, { status: false });
        return res.status(200).json({
            success:true,
            message: "Product deleted successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error deleting product",
            error: err.message
        })
    }
}

export const getProductByName = async (req, res) => {
    try {
        const { name } = req.params;
        const product = await Product.findOne( { name: { $regex: new RegExp(name, "i") } } );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Error retrieving product by name", error: err.message });
    }
};