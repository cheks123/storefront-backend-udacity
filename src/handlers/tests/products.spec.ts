import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";

import app from "../../server";
import { userType } from "../../interfaces/user";
import { productType } from "../../interfaces/products";

const request = supertest(app)
const TOKEN_SECRET = process.env.TOKEN_SECRET as Secret

const userData:userType = {first_name:"Charles", last_name:"Okoh", password:"123456"}
const productData:productType = {name:"Nokia", price:397}
let token:string
let userId:number
let productId:number


describe("Product Handler", ()=>{
    beforeAll(async ()=>{
        const response = await request.post('/users').send(userData)
        token = response.body

        const verified_obj = jwt.verify(token, TOKEN_SECRET)

        //@ts-ignore
        userId = verified_obj.user.id
    })

    afterAll(async()=>{
        await request.delete(`/users/${userId}`).set("auth-token", token)
    })

    it("should create product",  async (done) =>{
        const response = await request.post('/products').send(productData).set('auth-token', token)
        let status = response.status
        
            expect(status).toBe(200)
            productId = response.body.id
            done()
        
    })
    
    it("should get all products", async (done)=>{
        const response = await request.get('/products')
        expect(response.status).toBe(200)
        done()
        
    })

    it("it should get product by id", async (done)=>{
        const response = await request.get(`/products/${productId}`)
        expect(response.status).toBe(200)
        done()
        
    })

    it("it should delete products", async (done)=>{
        const response = await request.delete(`/products/${productId}`).set("auth-token", token)
        expect(response.status).toBe(200)
        done()
        
    })
})

