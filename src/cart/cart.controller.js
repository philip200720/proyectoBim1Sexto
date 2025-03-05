
import Product from "../product/product.model.js";
import Invoice from "../invoice/invoice.model.js";
import Cart from "../cart/cart.model.js";
import { validateStock } from "../helpers/db-validators.js";

const addToHistory = async (userId, productId, quantity) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const existingProduct = user.history.find(item => item.product.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            user.history.push({ product: productId, quantity });
        }

        await user.save();
        return {
            success: true,
            message: "Product added in history",
            history: user.history
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const addToCart = async (req, res) => {
    try {
        const uid = req.usuario._id;
        let cart = await Cart.findOne({ user: uid });
        const { product, quantity } = req.body;

        if (!cart) {
            cart = new Cart({ user: uid, items: [] });
        }

        const i = cart.items.findIndex(item => item.product.toString() === product);
        if (i > -1) {
            cart.items[i].quantity += quantity;
        } else {
            cart.items.push({ product, quantity });
        }
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product added to the cart",
            cart
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error adding product to the cart",
            error: err.message
        })
    }
}

export const checkout = async (req, res) => {
    try {
        const uid = req.usuario._id;
        const cart = await Cart.findOne({ user: uid });

        if (cart.items.length === 0 || !cart) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty or does not exist"
            })
        }
        let total = 0;
        await validateStock(cart.items)

        const invoiceItems = []
        for (const item of cart.items) {
            const product = await Product.findById(item.product)
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product ID ${item.product} not found`
                });
            }

            total += product.price * item.quantity;

            product.stock -= item.quantity
            product.sold = (product.sold || 0) + item.quantity
            await product.save()

            invoiceItems.push({
                product: item.product,
                quantity: item.quantity,
                price: price
            })
            addToHistory(uid, product, item.quantity)
        }
        const invoice = new Invoice({
            user: userId,
            items: invoiceItems,
            total: total
        })
        await invoice.save();
        cart.items = [];
        await cart.save();

        const pdfPath = await generateInvoicePDF(invoice);

        res.setHeader("Content-Disposition", `attachment; filename=factura_${invoice._id}.pdf`);
        res.setHeader("Content-Type", "application/pdf");

        res.download(pdfPath, `factura_${invoice._id}.pdf`, (err) => {
            if (err) {
                console.error("Error sending PDF:", err)
            }
            fs.unlink(pdfPath, (unlinkErr) => {
                if (unlinkErr) console.error("Error deleting temporary file:", unlinkErr);
            });
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error in checkout",
            error: err.message
        })
    }
}

export const listCarts = async (req, res) => {
    try {
        const carts = await Cart.find().populate("user").populate("items.product");
        return res.status(200).json({
            success: true,
            message: "Carts retrieved successfully",
            carts
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving carts",
            error: err.message
        })
    }
}