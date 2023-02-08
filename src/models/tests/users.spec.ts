import { Users } from "../user";

const user = new Users()

describe("Users model", ()=>{
    it("should have index method", (done)=>{
        expect(user.index).toBeDefined()
        done()
    })
    it("should have create method", (done)=>{
        expect(user.create).toBeDefined()
        done()
    })

    it("should have show method", (done)=>{
        expect(user.show).toBeDefined()
        done()
    })

    it("should have ", (done)=>{
        expect(user.authenticate).toBeDefined()
        done()
    })

    it("should have delete method", (done)=>{
        expect(user.delete).toBeDefined()
        done()
    })
})