import client from "../database";
import { createdProduct, productType } from "../interfaces/products";



export class Products{
    async index():Promise<createdProduct[]>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }
        catch(err){
            throw new Error(`Cannot get items ${err}`)
        }
    }

    async show(id:string):Promise<createdProduct>{
        
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM products WHERE id = ($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]

        }
        catch(err){
            throw new Error(`Cannot find item ${id}. Error: ${err}`)
        }
    }

    async create(p:productType):Promise<createdProduct>{
        try{
            const conn = await client.connect()
            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *'
            const result = await conn.query(sql, [p.name, p.price])
            conn.release()
            return result.rows[0]

        }
        catch(err){
            throw new Error(`Could not add new book ${p.name}. Error: ${err}`)
        }
    }

    async delete(id:string):Promise<createdProduct>{
        
        try{
            const conn = await client.connect()
            const sql = 'DELETE FROM products WHERE id = ($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]

        }
        catch(err){
            throw new Error(`Cannot find item ${id}. Error: ${err}`)
        }
    }

}