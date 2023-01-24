import express, { Request, Response } from "express"
import { getUsers, getUser, createUser } from "../handlers/userhandler"

const userRouter = (app:express.Application) =>{
    app.get('/users', getUsers)
    app.get('/users/:id', getUser)
    app.post('/users', createUser) 
}


export default userRouter