import client from "../database";
import bcrypt from "bcryptjs"
import { userType, userTypeId } from "../interfaces/user";


export class Users{
    async index():Promise<userTypeId[]>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }
        catch(err){
            throw new Error(`Cannot get user: ${err}`)
        }
    }

    async show(id:string):Promise<userTypeId>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM users WHERE id = ($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]

        }
        catch(err){
            throw new Error(`Cannot find item ${id}. Error: ${err}`)
        }
    }

    async create(u:userType):Promise<userTypeId>{
        try{
            const conn = await client.connect()
            const sql = 'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *'
            const hashed_password = bcrypt.hashSync(
                u.password + process.env.PEPPER,
                parseInt(process.env.SALT as string))
            
            const username:string = u.first_name.toLowerCase() + u.last_name.toLowerCase()

            const result = await conn.query(sql, [u.first_name, u.last_name, username, hashed_password])
            conn.release()
            return result.rows[0]

        }
        catch(err){
            throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`)
        }
    }

    async delete(id:string):Promise<userTypeId>{
        try{
            const sql = 'DELETE FROM users WHERE id = ($1)'

            //@ts-ignore
            const conn = await client.connect()
            
            const result = await conn.query(sql, [id])
            const user:userTypeId = result.rows[0]
            conn.release()
            return user

        }
        catch(err){
            throw new Error(`Cannot find item ${id}. Error: ${err}`)
        }
    }


    async authenticate(username:string, password:string):Promise<userTypeId | null>{
        const conn = await client.connect()
        const sql = 'SELECT * FROM users WHERE username=($1)'
        const result = await conn.query(sql, [username])
        console.log(password + process.env.PEPPER)
        if(result.rows.length){
            const user:userTypeId = result.rows[0]

            if(bcrypt.compareSync(password + process.env.PEPPER, user.password)){
                return user
            }
        }
        return null
    }


}