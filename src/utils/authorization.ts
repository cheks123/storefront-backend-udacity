import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const authorize =(req:Request, res:Response, next:NextFunction) =>{
    try{
        const authorizationHeader = req.headers["authorization"]
        const token = authorizationHeader?.split(' ')[1]
        jwt.verify(token as string, process.env.TOKEN_SECRET as string)

        next()

    }
    catch(error){
        res.status(401)
        res.json({ error })


    }

}