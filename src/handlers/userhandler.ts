import { Request, Response } from "express";
import { Users, UserType } from "../models/user";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import { createJWT } from "../utils/authentication";

dotenv.config()

const user = new Users()


export const getUsers = async(_req:Request, res:Response) =>{
    const users = await user.index()
    res.json(users)

}

export const getUser = async(req:Request, res:Response) =>{
    const single_user = await user.show(req.params.id)
    res.json(single_user)
    
}
export const createUser = async(req:Request, res:Response) =>{
    try{
        const hashed_password = bcrypt.hashSync(req.body.password + process.env.PEPPER, parseInt(process.env.SALT as string))
        const user_to_create:UserType = {
            id : req.body.id,
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            password:hashed_password
        }

        const newUser = await user.create(user_to_create)
        const token = createJWT(newUser)
        res.json(token)
        
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}
