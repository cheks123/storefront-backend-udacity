import express from "express"
import { createProduct, getProduct, getProducts, deleteProduct } from "../handlers/producthandler"
import { authorize } from "../utils/authorization"

const productRouter = (app:express.Application) =>{
    app.get('/products', getProducts)
    app.get('/products/:id', getProduct)
    app.post('/products', authorize, createProduct)
    app.delete('/products/:id', authorize, deleteProduct)
}


export default productRouter