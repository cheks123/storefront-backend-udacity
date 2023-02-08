import jwt from "jsonwebtoken"
import { userTypeId } from "../interfaces/user"

const secret = process.env.TOKEN_SECRET as string

export const createJWT = (u:userTypeId | null):string =>{
    return jwt.sign({user: u}, secret)
}