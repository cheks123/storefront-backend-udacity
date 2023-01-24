import client from "../database";

export type UserType = {
    id : number;
    firstName : string;
    lastName : string;
    password : string;
}

export class Users{
    async index():Promise<UserType[]>{
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

    async show(id:string):Promise<UserType>{
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

    async create(u:UserType):Promise<UserType>{
        try{
            const conn = await client.connect()
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [u.firstName, u.lastName, u.password])
            conn.release()
            return result.rows[0]

        }
        catch(err){
            throw new Error(`Could not add new book ${u.firstName}. Error: ${err}`)
        }
    }

}