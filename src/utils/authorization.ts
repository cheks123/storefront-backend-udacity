import { NextFunction, Request, Response } from "express"
import jwt, {Secret} from "jsonwebtoken"

export const authorize =(req:Request, res:Response, next:NextFunction) =>{
    const token = req.header("auth-token")
    if(!token){
        res.status(401)
        res.json("Access Denied")
        return false
    }

    try{
        
        const verified = jwt.verify(token, process.env.TOKEN_SECRET as Secret)
        //@ts-ignore
        req.user = verified
        next()
        
        

    }
    catch(error){
        console.log(error)
        res.status(401)
        res.send("Invalid token")

        return false


    }

}