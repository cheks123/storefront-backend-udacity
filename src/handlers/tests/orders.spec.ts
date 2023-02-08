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
        const {body:userBody} = await request.post('/users').send(userData)
        token = userBody

        //@ts-ignore
        const {user} = jwt.verify(token, TOKEN_SECRET)
        userId = user.id

        const {body: productBody} = await request.post('/products')
        .set("Authorization", "bearer " + token)
        .send(productData)

        productId = productBody.id

        orderData = {user_id: userId, status:"active"}
        orderProductData = {product_id:productId, user_id:userId, quantity:3}
    })

    afterAll(async()=>{
        await request.delete(`products/${productId}`).set("Authorization", "bearer " + token)
        await request.delete(`users/${userId}`).set("Authorization", "bearer " + token)
    })

    it("should create order", (done)=>{
        request.post('/orders')
        .send(orderData)
        .set("Authorization", "bearer " + token)
        .then(res=>{
            const {body, status} = res
            expect(status).toBe(200)
            orderId = body.id
            done()
        })
    })

    it("should get all orders", (done)=>{
        request.get('/orders')
        .set("Authorization", "bearer " + token)
        .then(res=>{
            expect(res.status).toBe(200)
        })
    })

    it("should get all active orders by user", (done)=>{
        request.get(`/current-orders/${userId}`)
        .set("Authorization", "bearer " + token)
        .then(res=>{
            expect(res.status).toBe(200)
            done()
        })
    })

    it("should post to order-products", (done)=>{
        request.get('/order-products')
        .send(orderProductData)
        .set("Authorization", "bearer " + token)
        .then(res=>{
            const {body, status } = res
            expect(status).toBe(200)
            orderProductId = body.id
            done()
        })
    })

    it("should delete order-products by id", (done)=>{
        request.delete(`/order-products/${orderProductId}`)
        .set("Authorization", "bearer " + token)
        .then(res=>{
            expect(res.status).toBe(200)
        })
    })

})