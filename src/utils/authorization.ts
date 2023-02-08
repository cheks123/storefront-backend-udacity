import { NextFunction, Request, Response } from "express"
import jwt, {Secret} from "jsonwebtoken"

export const authorize =(req:Request, res:Response, next:NextFunction) =>{
    if(!req.headers.authorization){
        res.status(401)
        res.json("Invalid token")
        return false
    }

    try{
        const authorizationHeader = req.headers["authorization"]
        
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as Secret)

        next()
        
        

    }
    catch(error){
        console.log(error)
        res.status(401)
        res.json({ error })

        return false


    }

}