import express, { Request, Response } from "express"
import { createOrder, getOrders, getCurrentOrders } from "../handlers/orderhandler"
import { authorize } from "../utils/authorization"

const userRouter = (app:express.Application) =>{
    app.get('/orders', getOrders)
    app.post('/orders', createOrder)
    app.get('/current-orders/:user_id', authorize, getCurrentOrders)
    
}


export default userRouter