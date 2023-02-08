import { Products } from "../product";

const product = new Products()

describe("Product model", ()=>{
    it("should have create method", (done)=>{
        expect(product.create).toBeDefined()
        done()
    })

    it("should have show method", (done)=>{
        expect(product.show).toBeDefined()
        done()
    })

    it("should have ", (done)=>{
        expect(product.index).toBeDefined()
        done()
    })

    it("should have delete method", (done)=>{
        expect(product.delete).toBeDefined()
        done()
    })
})