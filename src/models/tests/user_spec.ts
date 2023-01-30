import { Users } from "../user";


const user = new Users()

describe("Storefront", () =>{
    it("should have index method", () =>{
        expect(user.index()).toBeDefined();

    });

   

    it("should return list of users", async () =>{
        const result = await user.index()
        expect(result).toEqual([]);
    });
})