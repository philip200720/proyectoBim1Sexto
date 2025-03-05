'use strict'

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import { apiLimiter } from "../src/middlewares/rate-limit-validator.js"
import { createDefaultAdmin, createDefaultCategory } from "../src/helpers/db-validators.js"
import productRoutes from "../src/product/product.routes.js"
import userRoutes from "../src/user/user.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import invoiceRoutes from "../src/invoice/invoice.routes.js"
import cartRoutes from "../src/cart/cart.routes.js"
import authRoutes from "../src/auth/auth.routes.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }))
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }))
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/webStore/v1/products", productRoutes)
    app.use("/webStore/v1/users", userRoutes)
    app.use("/webStore/v1/categories", categoryRoutes)
    app.use("/webStore/v1/invoices", invoiceRoutes)
    app.use("/webStore/v1/carts", cartRoutes)
    app.use("/webStore/v1/auth", authRoutes)
}

const conectarDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = async () => {
    const app = express()
    try {
        middlewares(app)
        await conectarDB()
        await createDefaultAdmin()
        await createDefaultCategory()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}
