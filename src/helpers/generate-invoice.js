import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const createInvoicePDF = async (invoice) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margins: { top: 40, left: 50, right: 50, bottom: 40 } });
            const filePath = path.join(process.cwd(), "invoices", `invoice_${invoice._id}.pdf`);
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);

            doc.fontSize(24).fillColor("#222").text("Invoice", { align: "center" }).moveDown();

            doc.fontSize(12).fillColor("#444")
                .text(`Invoice ID: ${invoice._id}`)
                .text(`Date: ${invoice.createdAt ? new Date(invoice.createdAt).toLocaleString() : "Not Available"}`)
                .moveDown();

            const client = invoice.user || {};
            doc.text(`Client: ${client.name || "Unknown"}`)
                .text(`Email: ${client.email || "No email provided"}`)
                .moveDown();

            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown(0.5);

            doc.fontSize(14).fillColor("#000").text("Product Details", { underline: true }).moveDown(0.5);
            invoice.items.forEach((item, index) => {
                const productName = item.product?.name || "Product not available";
                const quantity = item.quantity || 0;
                const price = item.price || 0;
                const totalItem = qty * price;

                doc.fontSize(12).fillColor("#333")
                    .text(`${index + 1}. ${productName} | Quantity: ${quantity} | Unit Price: $${price} | Total: $${totalItem}`)
                    .moveDown(0.3);
            });

            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown(0.5);

            doc.fontSize(14).fillColor("#000").text(`Total: $${invoice.total}`, { align: "right" }).moveDown();

            doc.fontSize(10).fillColor("#777").text("Thank you for your purchase!", { align: "center" });
            doc.end();

            stream.on("finish", () => resolve(filePath));
            stream.on("error", reject);
        } catch (error) {
            reject(error);
        }
    });
};