import jwt from "jsonwebtoken"
import { userType } from "../models/user"

const secret = process.env.TOKEN_SECRET as string

export const createJWT = (u:userType | null):string =>{
    return jwt.sign({user: u}, secret)
}