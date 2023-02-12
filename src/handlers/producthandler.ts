import { Request, Response } from "express";
import { Products } from "../models/product";
import { createdProduct, productType } from "../interfaces/products";
import dotenv from "dotenv"

dotenv.config()


const product = new Products()


export const getProducts = async(_req:Request, res:Response) =>{
    try{
        const products:createdProduct[] = await product.index()
        res.json(products)
    }
    catch(err){
        res.status(400)
        res.json(err)
    }

}

export const getProduct = async(req:Request, res:Response) =>{
    try{
        const single_product:createdProduct = await product.show(req.params.id)
        res.json(single_product)}
    catch(err){
        res.status(400)
        res.json(err)
    }
    
}
export const createProduct = async(req:Request, res:Response) =>{
    try{
        const product_to_create:productType = {
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

export const deleteProduct = async(req:Request, res:Response) =>{
    try{
        const single_product:createdProduct = await product.delete(req.params.id)
        res.json(single_product)
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
    
}
