import express, { Request, Response } from "express"
import { createOrder, getOrders, getCurrentOrders, orderProduct } from "../handlers/orderhandler"
import { authorize } from "../utils/authorization"

const userRouter = (app:express.Application) =>{
    app.get('/orders', getOrders)
    app.post('/orders', createOrder)
    app.get('/current-orders/:user_id', authorize, getCurrentOrders)
    app.post('/order-post', authorize, orderProduct)
    
}


export default userRouter