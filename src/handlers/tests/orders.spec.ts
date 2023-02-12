import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";

import app from "../../server";
import { userType } from "../../interfaces/user";
import { productType } from "../../interfaces/products";
import { baseOrderType, orderProductType } from "../../interfaces/order";

const request = supertest(app)
const TOKEN_SECRET = process.env.TOKEN_SECRET as Secret
const userData:userType = {first_name:"Edu", last_name:"Badey", password:"123456"}
const productData:productType = {name:"Hp Laptop", price: 899}
let userId:number
let productId:number
let orderProductId:number
let orderId:number
let token:string
let orderData:baseOrderType
let orderProductData:orderProductType

describe("Order Handler", ()=>{
    beforeAll(async ()=>{
        const response = await request.post('/users').send(userData)
        token = response.body

        
        const verified_obj = jwt.verify(token, TOKEN_SECRET)
        //@ts-ignore
        userId = verified_obj.user.id

        const response2 = await request.post('/products').send(productData).set("auth-token", token)
        
        productId = response2.body.id

        orderData = {user_id: userId, status:"active"}
        
    })

    

    it("should create order", async (done)=>{
        const response = await request.post('/orders').send(orderData).set("auth-token", token)
        orderId = response.body.id
        orderProductData = {product_id:productId, order_id:orderId, quantity:3}
        expect(response.status).toBe(200)    
        done()
    })

    it("should get all orders", async (done)=>{
        const response = await request.get('/orders').set("auth-token", token)
        expect(response.status).toBe(200)
        done()
    })

    it("should get all active orders by user", async (done)=>{
        const response = await request.get(`/current-orders/${userId}`).set("auth-token", token)
        expect(response.status).toBe(200)
        done()
    })

    it("should post to order-products", async (done)=>{
        const response = await request.post('/order-products').send(orderProductData).set("auth-token", token)
        expect(response.status).toBe(200)
        orderProductId = response.body.id
        done()
    })

    it("should delete order by id", async (done)=>{
        const response = await request.delete(`/orders/${orderId}`).set("auth-token", token)
        expect(response.status).toBe(200)
        done()
    })

    it("should delete order-products by id", async (done)=>{
        const response = await request.delete(`/order-products/${orderProductId}`).set("auth-token", token)
        expect(response.status).toBe(200)
        done()
    })

    afterAll(async(done)=>{
        const response = await request.delete(`/products/${productId}`).set("auth-token", token)
        expect(response.status).toBe(200)
        
        const response2 = await request.delete(`/users/${userId}`).set("auth-token", token)
        expect(response2.status).toBe(200)
        done()
    })

})