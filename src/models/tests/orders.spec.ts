import { Order } from "../order";

const ord = new Order()

describe("Order model", ()=>{
    it("should have create method", (done)=>{
        expect(ord.create).toBeDefined()
        done()
    })

    it("should have index method", (done)=>{
        expect(ord.index).toBeDefined()
        done()
    })

    it("should have current_order method", (done)=>{
        expect(ord.current_order).toBeDefined()
        done()
    })

    it("should have order_products method", (done)=>{
        expect(ord.order_products).toBeDefined()
        done()
    })

    it("should have delete_order_product method", (done)=>{
        expect(ord.delete_order).toBeDefined()
        done()
    })

    it("should have delete_order_product method", (done)=>{
        expect(ord.delete_order_products).toBeDefined()
        done()
    })
    
})