import express from "express"
import { getUsers, getUser, createUser, authenticateUser } from "../handlers/userhandler"
import { authorize } from "../utils/authorization"

const userRouter = (app:express.Application) =>{
    app.get('/users', authorize, getUsers)
    app.get('/users/:id', authorize, getUser)
    app.post('/users', createUser)
    app.post('/users/authenticate', authenticateUser) 
}


export default userRouter