import { Products, ProductType } from "../product";

const test_product:ProductType = {id:7, name: "Milk", price:200}


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