import supertest from "supertest"
import app from "../../server"
import jwt, { Secret} from "jsonwebtoken"
import { userType } from "../../interfaces/user"


const request = supertest(app)
const userData:userType = {first_name:"James", last_name: "Manager", password: "123456"}
const TOKEN_SECRET = process.env.TOKEN_SECRET as Secret
let userId:number
let token:string

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

    it("should create user", (done)=>{
        request.post('/users').send(userData).then((res)=>{
            const {body, status} = res
            token = body

            // @ts-ignore
            const {user} = jwt.verify(token, TOKEN_SECRET)
            userId = user.id

            expect(status).toBe(200)
            done()
        })
    })

    it("should gets all the users", (done)=>{
        request.get('/users')
        .set('Authorization', 'bearer ' + token)
        .then((res) =>{
            expect(res.status).toBe(200)
            done()
        })
    })

    it("should get user details", (done)=>{
        request.get(`/users/${userId}`)
        .set('Authorization', 'bearer ' + token)
        .then((res) =>{
            expect(res.status).toBe(200)
            done()
        })
    })

    it("should delete user", (done)=>{
        request.delete(`/users/${userId}`)
        .set('Authorization', 'bearer ' + token)
        .then((res)=>{
            expect(res.status).toBe(200)
        })
    })

})