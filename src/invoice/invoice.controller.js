import Invoice from "./invoice.model.js";
import Product from "../product/product.model.js";
import { validateStock } from "../helpers/db-validators.js";

// ✅ Actualizar una factura
export const updateInvoice = async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const { items: updatedItems } = req.body;

        const invoice = await Invoice.findById(invoiceId);
        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found"
            });
        }

        await validateStock(updatedItems);

        let total = 0;
        for (const item of updatedItems) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: `Product not found: ${item.product}`
                });
            }
            total += product.price * item.quantity;
        }

        invoice.items = updatedItems;
        invoice.total = total;
        await invoice.save();

        return res.status(200).json({
            success: true,
            message: "Invoice updated successfully",
            invoice
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating invoice",
            error: error.message
        });
    }
};

export const listInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate("user").populate("items.product");
        return res.status(200).json({
            success: true,
            invoices
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving invoices",
            error: error.message
        });
    }
};

export const getInvoicesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const invoices = await Invoice.find({ user: userId }).populate("items.product");
        if (!invoices.length) {
            return res.status(404).json({
                success: false, message:
                "No invoices found for this user"
            });
        }

        return res.status(200).json({
            success: true,
            invoices
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Error retrieving invoices by user ID",
            error: error.message
        });
    }
};

export const getInvoiceProducts = async (req, res) => {
    try {
        const { invoiceId } = req.params;

        const invoice = await Invoice.findById(invoiceId).populate("items.product");
        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found"
            });
        }

        const products = invoice.items.map(item => ({
            product: item.product,
            quantity: item.quantity
        }));

        return res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving invoice products",
            error: error.message
        });
    }
};

export default Invoice;
