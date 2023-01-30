import client from "../database";
import { baseOrderType, orderProductType, orderType } from "../interfaces/order";


export class Order{
    async create(o:baseOrderType):Promise<orderType>{
        const conn = await client.connect()
        const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
        const result = await conn.query(sql, [o.user_id, o.status])
        conn.release()
        return result.rows[0]
    }
    
   async index():Promise<orderType[]> {
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }
        catch(err){
            throw new Error(`Cannot get orders ${err}`)
        }
    
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

    async order_products(o:orderProductType):Promise<orderType>{
        try{
            const conn = await client.connect()
            const sql = 'INSERT INTO orders (user_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [o.user_id, o.product_id, o.quantity])
            conn.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Cannot create order-products ${err}`)
        }
    }

    

}