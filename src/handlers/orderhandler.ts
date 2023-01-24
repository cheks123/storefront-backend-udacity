import { Request, Response } from "express";
import { Order, orderType, baseOrderType } from "../models/order";


const order = new Order()


export const getOrders = async (req:Request, res:Response) =>{
    const orders:orderType[] = await order.index()
    res.json(orders)
}
export const getCurrentOrders = async(req:Request, res:Response) =>{

    const current_orders = await order.current_order(req.params.user_id)
    res.json(current_orders)

}

export const createOrder = async(req:Request, res:Response) =>{
    try{

        const order_to_create:baseOrderType = {
            product_id: req.body.product_name,
            quantity: req.body.quantity,
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




