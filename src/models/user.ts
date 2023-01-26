import client from "../database";
import bcrypt from "bcryptjs"

export type userType = {
    first_name : string;
    last_name : string;
    password : string;
}

export class Users{
    async index():Promise<userType[]>{
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

    async show(id:string):Promise<userType>{
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

    async create(u:userType):Promise<userType>{
        try{
            const conn = await client.connect()
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *'
            const hashed_password = bcrypt.hashSync(
                u.password + process.env.PEPPER,
                parseInt(process.env.SALT as string))
            const result = await conn.query(sql, [u.first_name, u.last_name, hashed_password])
            conn.release()
            return result.rows[0]

        }
        catch(err){
            throw new Error(`Could not add new book ${u.first_name}. Error: ${err}`)
        }
    }

    async authenticate(first_name:string, password:string):Promise<userType | null>{
        const conn = await client.connect()
        const sql = 'SELECT * FROM users WHERE first_name=($1)'
        const result = await conn.query(sql, [first_name])
        console.log(password + process.env.PEPPER)
        if(result.rows.length){
            const user = result.rows[0]
            console.log(user)

            if(bcrypt.compareSync(password + process.env.PEPPER, user.password)){
                return user
            }
        }
        return null
    }


}