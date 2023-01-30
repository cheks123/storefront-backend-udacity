import { Products } from "../product";

const product = new Products()

describe("Storefront", () =>{
    it("should have index method", () =>{
        expect(product.index()).toBeDefined();

    });

   

    it("should return list of users", async () =>{
        const result = await product.index()
        expect(result).toEqual([]);
    });
})