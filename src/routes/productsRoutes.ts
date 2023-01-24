import express, { Request, Response } from "express"
import { createProduct, getProduct, getProducts } from "../handlers/producthandler"

const productRouter = (app:express.Application) =>{
    app.get('/products', getProducts)
    app.get('/products/:id', getProduct)
    app.post('/products', createProduct)
}


export default productRouter