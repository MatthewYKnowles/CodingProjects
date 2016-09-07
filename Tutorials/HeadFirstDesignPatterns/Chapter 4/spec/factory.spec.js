"use strict";
var factory_1 = require("../src/factory");
describe("Simple Pizza Factory", function () {
    var simplePizzaFactory;
    beforeEach(function () {
        simplePizzaFactory = new factory_1.SimplePizzaFactory();
    });
    it("should return a new cheese pizza", function () {
        expect(simplePizzaFactory.createPizza("cheese")).toEqual(new factory_1.CheesePizza());
    });
    it("should return a new cheese pizza", function () {
        expect(simplePizzaFactory.createPizza("pepperoni")).toEqual(new factory_1.PepperoniPizza());
    });
    it("should return a new clam pizza", function () {
        expect(simplePizzaFactory.createPizza("clam")).toEqual(new factory_1.ClamPizza());
    });
    it("should return a new veggie pizza", function () {
        expect(simplePizzaFactory.createPizza("veggie")).toEqual(new factory_1.VeggiePizza());
    });
});
describe("Pizza Store", function () {
    it("should return a cheese pizza", function () {
        var simplePizzaFactory = new factory_1.SimplePizzaFactory();
        var pizzaStore = new factory_1.PizzaStore(simplePizzaFactory);
        expect(pizzaStore.orderPizza("cheese")).toEqual(new factory_1.CheesePizza());
    });
});
//# sourceMappingURL=factory.spec.js.map