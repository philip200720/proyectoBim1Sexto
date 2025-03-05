
import Product from "../product/product.model.js";
import Invoice from "../invoice/invoice.model.js";
import Cart from "../cart/cart.model.js";
import { validateStock } from "../helpers/db-validators.js";

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

        for (const item of cart.items) {
            const product = await Product.findById(item.product)
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product ID ${item.product} not found`
                });
            }

            const price = product.price
            total += price * item.quantity


            product.stock -= item.quantity
            product.sold = (product.sold || 0) + item.quantity
            await product.save()

            const invoiceItems = []
            invoiceItems.push({
                product: item.product,
                quantity: item.quantity,
                price: price
            })
        }
        const invoice = new Invoice({
            user: userId,
            items: invoiceItems,
            total: total
        })
        await invoice.save();
        cart.items = [];
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "purchase made successfully",
            invoice
        })

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