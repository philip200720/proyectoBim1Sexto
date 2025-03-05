

// Función para editar una factura
export const updateInvoice = async (invoiceId, updatedItems) => {
    try {
        // Obtener la factura
        const invoice = await Invoice.findById(invoiceId);
        if (!invoice) {
            throw new Error("Invoice not found");
        }

        // Verificar stock suficiente
        for (const item of updatedItems) {
            const product = await Product.findById(item.product);
            if (!product) {
                throw new Error(`Product with ID ${item.product} not found`);
            }
            if (item.quantity > product.stock) {
                throw new Error(`Insufficient stock for product: ${product.name}`);
            }
        }

        // Calcular el nuevo total
        let total = 0;
        for (const item of updatedItems) {
            const product = await Product.findById(item.product);
            total += product.price * item.quantity;
        }

        // Actualizar la factura
        invoice.items = updatedItems;
        invoice.total = total;
        await invoice.save();

        return invoice;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Función para listar todas las facturas
export const listInvoices = async () => {
    try {
        return await Invoice.find().populate("user").populate("items.product");
    } catch (error) {
        throw new Error("Error retrieving invoices");
    }
};

// Función para buscar facturas por ID de usuario
export const getInvoicesByUserId = async (userId) => {
    try {
        return await Invoice.find({ user: userId }).populate("items.product");
    } catch (error) {
        throw new Error("Error retrieving invoices by user ID");
    }
};

export default Invoice;