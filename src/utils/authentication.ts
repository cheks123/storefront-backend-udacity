import jwt from "jsonwebtoken"
import { UserType } from "../models/user"

const secret = process.env.TOKEN_SECRET as string

export const createJWT = (user:UserType):string =>{
    return jwt.sign(user, secret)
}