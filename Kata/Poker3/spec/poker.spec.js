"use strict";
var poker_1 = require("../src/poker");
describe("Poker", function () {
    it("should return Black wins with high card 9", function () {
        expect(poker_1.Poker.getWinner("Black: 9H 8C 6S 5D 4H White: 8H 7C 5H 4S 3C")).toBe("Black wins. - with high card: 9");
    });
    it("should return White wins with high card 9", function () {
        expect(poker_1.Poker.getWinner("Black: 2H 7C 6S 5D 4H White: 8H 7C 5H 4S 3C")).toBe("White wins. - with high card: 8");
    });
    it("should return Black wins with high card 9", function () {
        expect(poker_1.Poker.getWinner("Black: 2H 8C 6S 9D 4H White: 8H 7C 5H 4S 3C")).toBe("Black wins. - with high card: 9");
    });
    it("should return White wins with high card Ten", function () {
        expect(poker_1.Poker.getWinner("Black: 2H 8C 6S 9D 4H White: 8H 7C TH 4S 3C")).toBe("White wins. - with high card: Ten");
    });
    it("should return Black wins with high card Ace", function () {
        expect(poker_1.Poker.getWinner("Black: 2H 8C AS 9D 4H White: 8H 7C TH 4S 3C")).toBe("Black wins. - with high card: Ace");
    });
    it("should return White wins with high card King since both hands have Aces", function () {
        expect(poker_1.Poker.getWinner("Black: 2H 8C AS 9D 4H White: 8H 7C KH 4S AC")).toBe("White wins. - with high card: King");
    });
    it("should return White wins with high card 4 since both hands have 4 of the same cards", function () {
        expect(poker_1.Poker.getWinner("Black: 2H KC AS QD JH White: 4H QC KH JS AC")).toBe("White wins. - with high card: 4");
    });
    it("should return tie since all cards are the same", function () {
        expect(poker_1.Poker.getWinner("Black: 4C KC AS QD JH White: 4H QC KH JS AC")).toBe("tie.");
    });
    it("should return black wins with a pair of 8s", function () {
        expect(poker_1.Poker.getWinner("Black: 4C KC AS 8D 8H White: 4H QC KH JS AC")).toBe("Black wins. - with pair: 8");
    });
    it("should return white wins with a pair of 9s", function () {
        expect(poker_1.Poker.getWinner("Black: 4C KC AS 7D 8H White: 4H QC KH 9S 9C")).toBe("White wins. - with pair: 9");
    });
    it("should return black wins with a pair of Tens", function () {
        expect(poker_1.Poker.getWinner("Black: 4C KC AS TD TH White: 4H QC KH 8S 9C")).toBe("Black wins. - with pair: Ten");
    });
    it("should return white wins with the higher pair of jacks", function () {
        expect(poker_1.Poker.getWinner("Black: 4C KC AS TD TH White: 4H QC KH JS JC")).toBe("White wins. - with pair: Jack");
    });
    it("should return black wins with the higher pair of Aces", function () {
        expect(poker_1.Poker.getWinner("Black: 4C KC AS TD AH White: 4H QC KH JS JC")).toBe("Black wins. - with pair: Ace");
    });
    it("should return white wins with the highest card since both pairs are the same", function () {
        expect(poker_1.Poker.getWinner("Black: 4C KC 6S JD JH White: 4H QC KH JS JC")).toBe("White wins. - with high card: Queen");
    });
    it("should return black wins with a two pair", function () {
        expect(poker_1.Poker.getWinner("Black: 4C 6C 6S JD JH White: 4H QC KH 5S JC")).toBe("Black wins. - with two pair: Jack");
    });
    it("should return white wins with a two pair", function () {
        expect(poker_1.Poker.getWinner("Black: 4C 6C 6S TD JH White: 4H QC 9H 9S 4C")).toBe("White wins. - with two pair: 9");
    });
    it("should return black wins with a two pair even though first pairs are the same", function () {
        expect(poker_1.Poker.getWinner("Black: 4C 6C 6S 9D 9H White: 4H QC 9H 9S 4C")).toBe("Black wins. - with two pair: 6");
    });
    it("should return white wins with a two pair even though first pairs are the same", function () {
        expect(poker_1.Poker.getWinner("Black: 4C 3C 3S 9D 9H White: 4H QC 9H 9S 4C")).toBe("White wins. - with two pair: 4");
    });
    it("should return white wins with a high card since both hands have same two pair", function () {
        expect(poker_1.Poker.getWinner("Black: 4C 6C 6S 9D 9H White: 6H QC 9C 9S 6D")).toBe("White wins. - with high card: Queen");
    });
    it("should return white wins with a high card since both hands have same two pair", function () {
        expect(poker_1.Poker.getWinner("Black: 4C 6C 6S 9D 9H White: 6H QC 9C 9S 6D")).toBe("White wins. - with high card: Queen");
    });
    it("should return white wins with a three of a kind", function () {
        expect(poker_1.Poker.getWinner("Black: 4C 6C 6S 9D 9H White: 6H QC 9C 9S 9D")).toBe("White wins. - with three of a kind: 9");
    });
    it("should return black wins with a three of a kind", function () {
        expect(poker_1.Poker.getWinner("Black: 4C 6C 6S 6D 9H White: 6H QC 6C 9S 9D")).toBe("Black wins. - with three of a kind: 6");
    });
    it("should return white wins with a strait", function () {
        expect(poker_1.Poker.getWinner("Black: 4C 6C 6S 6D 9H White: 6H 7C 8C 9S TD")).toBe("White wins. - with strait: Ten");
    });
    it("should return black wins with a strait", function () {
        expect(poker_1.Poker.getWinner("Black: QC JC 8S TD 9H White: 8H 7C 8C 9S TD")).toBe("Black wins. - with strait: Queen");
    });
    it("should return white wins with a strait with Ace as a low card", function () {
        expect(poker_1.Poker.getWinner("Black: QC JC TS TD 9H White: 2H 3C 5C 4S AD")).toBe("White wins. - with strait: 5");
    });
    it("should return black wins with a higher strait", function () {
        expect(poker_1.Poker.getWinner("Black: QC JC 8S TD 9H White: 2H 3C 5C 4S AD")).toBe("Black wins. - with strait: Queen");
    });
    it("should return tie when both hands have the same strait", function () {
        expect(poker_1.Poker.getWinner("Black: 6C 7C 8S TD 9H White: 6H 7C 8C 9S TD")).toBe("tie.");
    });
    it("should return white wins with a flush", function () {
        expect(poker_1.Poker.getWinner("Black: 6C 7C 8S TD 9H White: 2H 7H 8H 9H TH")).toBe("White wins. - with flush: Ten");
    });
    it("should return black wins with a flush", function () {
        expect(poker_1.Poker.getWinner("Black: 6S 2S QS TS 9S White: 2C 7H 8H 9H TH")).toBe("Black wins. - with flush: Queen");
    });
    it("should return black wins with a flush with a higher card", function () {
        expect(poker_1.Poker.getWinner("Black: 6S 2S AS TS 9S White: 2H 7H 8H 9H TH")).toBe("Black wins. - with flush: Ace");
    });
    it("should return tie since both hands have same flush", function () {
        expect(poker_1.Poker.getWinner("Black: 7S 2S 8S TS 9S White: 2H 7H 8H 9H TH")).toBe("tie.");
    });
    it("should return white wins with a full house", function () {
        expect(poker_1.Poker.getWinner("Black: 6S 2S AS TS 9S White: 2H 2S 2C 9H 9C")).toBe("White wins. - with full house: 2");
    });
    it("should return black wins with a full house", function () {
        expect(poker_1.Poker.getWinner("Black: 6S 6C 6H TS TH White: 2H 5S 2C 9H 9C")).toBe("Black wins. - with full house: 6");
    });
    it("should return white wins with a higher full house", function () {
        expect(poker_1.Poker.getWinner("Black: 6S 6C 6H TS TH White: 7H 7S 7C 9H 9C")).toBe("White wins. - with full house: 7");
    });
    it("should return black wins with a four of a kind", function () {
        expect(poker_1.Poker.getWinner("Black: QS QC QH QD TH White: 7H 7S 7C 9H 9C")).toBe("Black wins. - with four of a kind: Queen");
    });
    it("should return white wins with a four of a kind", function () {
        expect(poker_1.Poker.getWinner("Black: QS QC JH QD TH White: 7H 7S 7C 7D 9C")).toBe("White wins. - with four of a kind: 7");
    });
    it("should return black wins with the higher four of a kind", function () {
        expect(poker_1.Poker.getWinner("Black: JS JC JH JD TH White: 7H 7S 7C 7D 9C")).toBe("White wins. - with four of a kind: Jack");
    });
});
describe("Hand", function () {
    it("should take in the string pokerhand and set playerColor", function () {
        var blackHand = new poker_1.Hand("Black: 8H 7C 5H 4S 3C");
        expect(blackHand.playerColor).toBe("Black");
    });
    it("should take in the string pokerhand and set hand array", function () {
        var blackHand = new poker_1.Hand("Black: 8H 7C 5H 4S 3C");
        expect(blackHand.hand).toEqual([[8, 'H'], [7, 'C'], [5, 'H'], [4, 'S'], [3, 'C']]);
    });
    it("should sort the hand with the highest numbers up front", function () {
        var blackHand = new poker_1.Hand("Black: 2H 3D 5S 9C 6D");
        expect(blackHand.hand).toEqual([[9, 'C'], [6, 'D'], [5, 'S'], [3, 'D'], [2, 'H']]);
    });
    it("should convert T to 10 before sorting", function () {
        var blackHand = new poker_1.Hand("Black: 2H 3D 5S TC 6D");
        expect(blackHand.hand).toEqual([[10, 'C'], [6, 'D'], [5, 'S'], [3, 'D'], [2, 'H']]);
    });
});
//# sourceMappingURL=poker.spec.js.map