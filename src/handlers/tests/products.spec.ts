import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";

import app from "../../server";
import { userType } from "../../interfaces/user";
import { productType } from "../../interfaces/products";

const request = supertest(app)
const TOKEN_SECRET = process.env.TOKEN_SECRET as Secret

const userData:userType = {first_name:"Charles", last_name:"Okoh", password:"123456"}
const productData:productType = {name:"iphone", price:399}
let token:string
let userId:number
let productId:number


describe("Product Handler", ()=>{
    beforeAll(async ()=>{
        const {body} = await request.post('/users').send(userData)
        token = body

        //@ts-ignore
        const {user} = jwt.verify(token, TOKEN_SECRET)
        userId = user.id
    })

    afterAll(async()=>{
        await request.delete(`/users/${userId}`)
        .set("Authorization", "bearer " + token)
    })

    it("should create product",  (done) =>{
        request.post('/products').send(productData)
        .set('Authorization', 'bearer ' + token)
        .then((res)=>{
            const {body, status} = res
            expect(status).toBe(200)
            productId = body.id
            done()
        })
    })
    
    it("should get all products", (done)=>{
        request.get('/products')
        .then(res =>{
            expect(res.status).toBe(200)
            done()
        })
    })

    it("it should get product by id", (done)=>{
        request.get(`/products/${productId}`)
        .then(res=>{
            expect(res.status).toBe(200)
            done()
        })
    })

    it("it should delete products", (done)=>{
        request.delete(`/products/${productId}`)
        .set("Authorization", "bearer " + token)
        .then(res=>{
            expect(res.status).toBe(200)
            done()
        })
    })
})

