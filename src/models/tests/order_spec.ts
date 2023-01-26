import { Order, orderType } from "../order";


const order = new Order()

describe("Storefront", () =>{
    it("should have index method", () =>{
        expect(order.index()).toBeDefined();

    });

   

    it("should return list of users", async () =>{
        const result = await order.index()
        expect(result).toEqual([]);
    });
})