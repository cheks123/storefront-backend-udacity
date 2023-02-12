import express, { Request, Response } from "express"
import { createOrder, getOrders, getCurrentOrders,
    orderProduct, deleteOrder, deleteOrderProduct } from "../handlers/orderhandler"
import { authorize } from "../utils/authorization"

const orderRouter = (app:express.Application) =>{
    app.get('/orders', authorize, getOrders)
    app.post('/orders', authorize, createOrder)
    app.get('/current-orders/:user_id', authorize, getCurrentOrders)
    app.post('/order-products', authorize, orderProduct)
    app.delete('/orders/:order_id', authorize, deleteOrder)
    app.delete('/order-products/:order_product_id', authorize, deleteOrderProduct)
    
}


export default orderRouter