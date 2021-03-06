import {OrderedJobs} from "../src/orderedJobs";

describe("Ordered Jobs", ()=> {
    it("should return empty string for empty string", ()=> {
        let orderedJobs: OrderedJobs = new OrderedJobs("");
        expect(orderedJobs.getOrderedJobs()).toEqual("")
    });
    it("should return 1 job passed in", ()=> {
        let orderedJobs: OrderedJobs = new OrderedJobs("a =>");
        expect(orderedJobs.getOrderedJobs()).toEqual("a")
    });
    it("should return 2 jobs passed in", ()=> {
        let orderedJobs: OrderedJobs = new OrderedJobs("a =>\nb =>");
        expect(orderedJobs.getOrderedJobs()).toEqual("ab")
    });
    it("should return 3 jobs passed in", ()=> {
        let orderedJobs: OrderedJobs = new OrderedJobs("a =>\nb =>\nc =>");
        expect(orderedJobs.getOrderedJobs()).toEqual("abc")
    });
    it("should return 3 jobs passed in respect 1 dependency", ()=> {
        let orderedJobs: OrderedJobs = new OrderedJobs("a =>\nb => c\nc =>");
        expect(orderedJobs.getOrderedJobs()).toEqual("acb")
    });
    it("should work with multiple dependencies", ()=> {
        let orderedJobs: OrderedJobs = new OrderedJobs("a =>\nb => c\nc => f\nd => a\ne => b\nf =>");
        expect(orderedJobs.getOrderedJobs()).toEqual("afcdbe")
    });
    it("should return error when job dependency is itself", ()=> {
        let orderedJobs: OrderedJobs = new OrderedJobs("a =>\nb =>\nc => c");
        expect(()=> {orderedJobs.getOrderedJobs()}).toThrow(new Error("job references self"))
    });
    it("should return error when dependencies are in a circle", ()=> {
        let orderedJobs: OrderedJobs = new OrderedJobs("a =>\nb => c\nc => f\nd => a\ne =>\nf => b");
        expect(()=> {orderedJobs.getOrderedJobs()}).toThrow()
    });
});