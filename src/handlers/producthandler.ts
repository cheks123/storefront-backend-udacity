import { Request, Response } from "express";
import { Products, ProductType } from "../models/product";
import dotenv from "dotenv"

dotenv.config()


const product = new Products()


export const getProducts = async(_req:Request, res:Response) =>{
    const products = await product.index()
    res.json(products)

}

export const getProduct = async(req:Request, res:Response) =>{
    const single_product = await product.show(req.params.id)
    res.json(single_product)
    
}
export const createProduct = async(req:Request, res:Response) =>{
    try{
        const product_to_create = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price
        }
        const newProduct = await product.create(product_to_create)
        res.json(newProduct)
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}
