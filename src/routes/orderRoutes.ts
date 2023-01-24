import express, { Request, Response } from "express"
import { createOrder, getOrders, getCurrentOrders } from "../handlers/orderhandler"

const userRouter = (app:express.Application) =>{
    app.get('/orders', getOrders)
    app.post('/orders', createOrder)
    app.get('/current-orders/:user_id', getCurrentOrders)
    
}


export default userRouter