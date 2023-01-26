import { Users, userType } from "../user";

const test_user:userType = {"id":7, "firstName": "Adams", lastName:"Mosley", password: "1234abcd"}


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