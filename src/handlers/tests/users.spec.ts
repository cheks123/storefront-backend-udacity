import supertest from "supertest"
import app from "../../server"
import jwt, { Secret} from "jsonwebtoken"
import { userType } from "../../interfaces/user" 


const request = supertest(app)
const userData:userType = {first_name:"James", last_name: "Manager", password: "123456"}
const TOKEN_SECRET = process.env.TOKEN_SECRET as Secret
let userId:number
let token:string
let status:number

describe("User handler test", ()=>{
    it("should require authorization", (done)=>{
        request.get('/users').then((res)=>{
            expect(res.status).toBe(401)
            done()
        })
        request.get('/users/1').then((res) =>{
            expect(res.status).toBe(401)
            done()
        })
    })

    it("should create user", async (done)=>{
        
        const response = await request.post('/users').send(userData);
        token = response.body
        expect(response.status).toBe(200);
        const verified_obj = jwt.verify(token, TOKEN_SECRET)
        //@ts-ignore
        userId = verified_obj.user.id

        
        done()
        
    })

    it("should gets all the users", async (done)=>{
        const response = await request.get('/users').set('auth-token', token)
        
        expect(response.status).toBe(200)
        done()
        
    })

    it("should get user details", async (done)=>{
        const response = await request.get(`/users/${userId}`).set('auth-token', token)
        expect(response.status).toBe(200)
        done()
    
    })

    it("should delete user", async (done)=>{
        const response = await request.delete(`/users/${userId}`).set('auth-token', token)
        expect(response.status).toBe(200)
        done()
        
    })

})