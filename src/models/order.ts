import client from "../database";
import { baseOrderType, orderType } from "../interfaces/order";


export class Order{
    async create(o:baseOrderType):Promise<orderType>{
        const conn = await client.connect()
        const sql = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *'
        const result = await conn.query(sql, [o.product_id, o.quantity, o.user_id, o.status])
        conn.release()
        return result.rows[0]
    }
    
   async index():Promise<orderType[]> {
    const conn = await client.connect()
    const sql = 'SELECT * FROM orders'
    const result = await conn.query(sql)
    conn.release()
    return result.rows
    
   }

    async current_order(id:string):Promise<orderType[]>{
        const status = 'active'
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders WHERE status=($1) AND user_id = ($2)'
            const result = await conn.query(sql, [status, id])
            conn.release()
            return result.rows
        }
        catch(err){
            throw new Error(`Cannot get items ${err}`)
        }
    }

    

}