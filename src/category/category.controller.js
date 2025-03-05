import Category from "./category.model.js"

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Category creation failed",
            error: err.message
        })
    }
}

export const  getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ status: true })
        return res.status(200).json({
            success: true,
            categories
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving categories",
            error: err.message
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            updatedCategory
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating category",
            error: err.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndUpdate(id, { status: false })
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error deleting category",
            error: err.message
        })
    }
}
