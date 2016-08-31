import {Fraction} from "../src/sample";
var checkAddFractionsAsIntegers = function (addend: number, augend: number, sum: number) {
    expect(new Fraction(addend).plus(new Fraction(augend)).isEqual(new Fraction(sum))).toEqual(true);
};
describe("AddFractions", ()=> {
    it("should return zero for zero + zero", ()=> {
        checkAddFractionsAsIntegers(0,0,0);
    });
    it("should return non-zero for non-zero + zero", ()=> {
        checkAddFractionsAsIntegers(0,3,3);
    });
    it("should return non-zero for zero + non-zero", ()=> {
        checkAddFractionsAsIntegers(0,5,5);
    });
    it("should return non-zero for non-zero + non-zero", ()=> {
        checkAddFractionsAsIntegers(3,4,7);
    });
    it("should return positive 2 for negative 3 + positive 1", ()=> {
        checkAddFractionsAsIntegers(-3,2,-1);
    });
    it("should make sure that it can add with different denominators", ()=> {
        let sum: Fraction = new Fraction(1, 2).plus(new Fraction(1, 3));
        expect(sum.isEqual(new Fraction(5, 6))).toEqual(true);
    });
});
describe("FractionsEqual", ()=> {
    it("should make sure equal fractions are equal", ()=> {
        expect(new Fraction(3,5).isEqual(new Fraction(3,5))).toEqual(true);
    });
    it("should make sure unequal fraction nominators are not equal", ()=> {
        expect(new Fraction(3,5).isEqual(new Fraction(1,5))).toEqual(false);
    });
    it("should make sure unequal fractions denominators are not equal", ()=> {
        expect(new Fraction(3,4).isEqual(new Fraction(3,7))).toEqual(false);
    });
    it("should make sure whole number equals same fraction", ()=> {
        expect(new Fraction(5,1).isEqual(new Fraction(5))).toEqual(true);
    });
    it("should make sure whole number does not equal different whole number", ()=> {
        expect(new Fraction(6).isEqual(new Fraction(5))).toEqual(false);
    });
});
describe("Reduce Fraction Test", ()=> {
    it("should make sure an unreduceable function stays the way it is", ()=> {
        expect(new Fraction(3,4).isEqual(new Fraction(3,4))).toEqual(true);
    });
    it("reduce to not whole number", ()=> {
        expect(new Fraction(3,4).isEqual(new Fraction(6,8))).toEqual(true);
    });
});
describe("Greatest Common Divisor Test", ()=> {
    function gcd(a: number, b: number) {
        while (b != 0) {
            let t: number = b;
            b = a % t;
            a = t;
        }
        return Math.abs(a);
    }
    it("Reflexive", ()=> {
        expect(gcd(1,1)).toEqual(1);
        expect(gcd(2,2)).toEqual(2);
        expect(gcd(-1,-1)).toEqual(1);
    });
    it("Relatively Prime", ()=> {
        expect(gcd(2,3)).toEqual(1);
        expect(gcd(4,7)).toEqual(1);
        expect(gcd(-2,-3)).toEqual(1);
    });
    it("One is multiple of the other", ()=> {
        expect(gcd(3,9)).toEqual(3);
        expect(gcd(5,30)).toEqual(5);
    });
    it("Common Factor", ()=> {
        expect(gcd(6,8)).toEqual(2);
        expect(gcd(49,315)).toEqual(7);
        expect(gcd(-24,-28)).toEqual(4);
    });
    it("Negatives", ()=> {
        expect(gcd(24,-28)).toEqual(4);
        expect(gcd(-24,28)).toEqual(4);
    });
});