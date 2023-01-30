import express from "express"
import { createProduct, getProduct, getProducts } from "../handlers/producthandler"
import { authorize } from "../utils/authorization"

const productRouter = (app:express.Application) =>{
    app.get('/products', getProducts)
    app.get('/products/:id', getProduct)
    app.post('/products', authorize, createProduct)
}


export default productRouter