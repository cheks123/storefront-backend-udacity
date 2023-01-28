import { Request, Response } from "express";
import { Users } from "../models/user";
import { loginBody, userTypeId } from "../interfaces/user";
import dotenv from "dotenv";
import { userType } from "../interfaces/user";


import { createJWT } from "../utils/authentication";

dotenv.config()

const user = new Users()


export const getUsers = async(req:Request, res:Response) =>{

    const users = await user.index()
    res.json(users)

}

export const getUser = async(req:Request, res:Response) =>{
    const single_user = await user.show(req.params.id)
    res.json(single_user)
    
}

export const createUser = async(req:Request, res:Response) =>{
    try{
        
        const user_to_create:userType = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password:req.body.password
        }

        const newUser = await user.create(user_to_create)
        var token = createJWT(newUser)
        res.json(token)
        
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}

export const authenticateUser = async(req:Request, res:Response) =>{
    const user_to_authenticate:loginBody = {
        username: req.body.username,
        password:req.body.password
    }
    

    try{
        const authenticatedUser:userTypeId | null = await user.authenticate(user_to_authenticate.username, user_to_authenticate.password)
        var token = createJWT(authenticatedUser)
        res.json(token)
    }

    catch(error ){
        res.status(401)
        res.json({ error })
    }
}
