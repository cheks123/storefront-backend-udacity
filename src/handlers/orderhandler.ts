import { Request, Response } from "express";
import { Order } from "../models/order";
import { baseOrderType, orderProductType, orderType } from "../interfaces/order";


const order = new Order()


export const getOrders = async (req:Request, res:Response) =>{
    try{
        const orders:orderType[] = await order.index()
        res.json(orders)
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}
export const getCurrentOrders = async(req:Request, res:Response) =>{

    try{
        const current_orders = await order.current_order(req.params.user_id)
        res.json(current_orders)
    }
    catch(err){
        res.status(400)
        res.json(err)
    }

}

export const createOrder = async(req:Request, res:Response) =>{
    try{

        const order_to_create:baseOrderType = {
            user_id: req.body.user_id,
            status: req.body.status

        }

        const newOrder = await order.create(order_to_create)
        
        res.json(newOrder)
        
    }
    catch(err){
        res.status(400)
        res.json(err)
    }

    const current_orders = await order.current_order(req.params.user_id)
    res.json(current_orders)

}

export const orderProduct = async(req:Request, res:Response) =>{
    try{

        const order_to_create:orderProductType = {
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity

        }

        const newOrder = await order.order_products(order_to_create)
        
        res.json(newOrder)
        
    }
    catch(err){
        res.status(400)
        res.json(err)
    }

    //const current_orders = await order.current_order(req.params.user_id)
    //res.json(current_orders)

}





