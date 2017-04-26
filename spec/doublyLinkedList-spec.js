//#!javascript
// spec/doublyLinkedList-spec.js
'use strict';

var doublyLinkedList = require("../doublyLinkedList");
var testers = require("./testers");

describe("doublyLinkedList", function () {
    var newList, stringList, numberList;
    var newBase, stringBase, numberBase;

    var indexTester = testers.index();

    beforeEach(function() {
        stringBase = [
            "zero", "one", "two", "three", "four",
            "five", "six", "seven", "eight", "nine"
        ];
        numberBase = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        newList = new doublyLinkedList();
        stringList = new doublyLinkedList(...stringBase);
        numberList = new doublyLinkedList(...numberBase);
    });

    it("should create a new object", function () {
        expect(newList instanceof doublyLinkedList).toBeTruthy();
        expect(stringList instanceof doublyLinkedList).toBeTruthy();
        expect(numberList instanceof doublyLinkedList).toBeTruthy();
    });

    it("should initialize the length reference", function() {
        expect(newList.length).toBe(0);
        expect(stringList.length).toBe(stringList.length);
        expect(numberList.length).toBe(numberList.length);
    });

    it('should be equal to the initial array', function() {
        testers.array(stringList, stringBase);
        testers.array(numberList, numberBase);
    });

    describe("length", function() {
        it("should shrink the length when set less than length", function() {
            var newBase = [];
            expect(newList.length=3).toBe(newBase.length=3);
            expect(stringList.length=3).toBe(stringBase.length=3);
            expect(numberList.length=3).toBe(numberBase.length=3);

            testers.array(newList, newBase);
            testers.array(stringList, stringBase);
            testers.array(numberList, numberBase);

            expect(newList.length=0).toBe(newBase.length=0);
            expect(stringList.length=0).toBe(stringBase.length=0);
            expect(numberList.length=0).toBe(numberBase.length=0);

            testers.array(newList, newBase);
            testers.array(stringList, stringBase);
            testers.array(numberList, numberBase);
        });

        it("should grow the length when set greater than length", function() {
            var newBase = [];

            expect(newList.length=11).toBe(newBase.length=11);
            expect(stringList.length=11).toBe(stringBase.length=11);
            expect(numberList.length=11).toBe(numberBase.length=11);

            testers.array(newList, newBase);
            testers.array(stringList, stringBase);
            testers.array(numberList, numberBase);

            expect(newList.length=100).toBe(newBase.length=100);
            expect(stringList.length=100).toBe(stringBase.length=100);
            expect(numberList.length=100).toBe(numberBase.length=100);

            testers.array(newList, newBase);
            testers.array(stringList, stringBase);
            testers.array(numberList, numberBase);
        });
    });

    describe("[index] getter", function() {
        var verifyGetter = testers.getter();

        it("should accept and handle non-indexes", function() {
            // TODO: implement a test to verify that non-indexes are handled
            pending("implement a test to verify that non-indexes are handled");
        });

        it("should accept a negative index", function() {
            for (var i=-2*this.length; i<0; i++) {
                verifyGetter(i, numberList, numberBase);
            }
        });

        it("should accept an index past length-1", function() {
            for (var i=this.length; i<2*this.length; i++) {
                verifyGetter(i, numberList, numberBase);
            }
        });

        it("should get the data at the selected index", function() {
            for (var i=0; i<stringList.length; i++) {
                verifyGetter(i, stringList, stringBase);
            }

            for (var i=0; i<numberList.length; i++) {
                verifyGetter(i, numberList, numberBase);
            }
        });
    });

    describe("[index] setter", function() {
        var verifySetter = testers.setter();

        it("should accept and handle non-indexes", function() {
            // TODO: implement a test to verify that non-indexes are handled
            pending("implement a test to verify that non-indexes are handled");
        });

        it("should accept a negative index", function() {
            for (var i=-2*this.length; i<0; i++) {
                verifyGetter(i, numberList, numberBase);
            }
        });

        it("should accept an index past length-1", function() {
            for (var i=this.length; i<2*this.length; i++) {
                verifyGetter(i, numberList, numberBase);
            }
        });

        it("should set the selected index", function() {
            var stringStandard = Array.from(stringBase);
            for (var i=0; i<stringList.length; i++) {
                verifySetter(i, (2*i).toString(), stringList, stringStandard);
            }

            var numberStandard = Array.from(numberBase);
            for (var i=0; i<numberList.length; i++) {
                verifySetter(i, 2*i, numberList, numberStandard);
            }
        });
    });

    xdescribe("reduce()", function() {
        /*it("should throw errorNotImplemented", function() {
            stringList.reduce();
        });*/
    });

    xdescribe(".reverse()", function() {
    });

    xdescribe(".slice(index, count, [replace])", function() {
    });

    xdescribe(".splice(index, count, [replace])", function() {
    });

    xdescribe(".sort(index, count, [replace])", function() {
    });

    describe(".insert(index, data)", function() {
        var errorTesterInsert = testers.error('insert', [null, "test"], 0);

        function verifyInsert(index, value, testList, standard) {
            standard.splice(index, 0, value);
            testList.insert(index, value);
            testers.array(testList, standard);
        }

        it("should not accept non number indexes", function() {
            indexTester("Type", errorTesterInsert, stringList);
        });

        it("should not accept a negative index", function() {
            indexTester("Lower", errorTesterInsert, stringList);
        });

        it("should not accept an index past length-1", function() {
            indexTester("Upper", errorTesterInsert, stringList);
        });

        it("should insert the specified node", function() {
            var stringStandard = Array.from(stringBase);
            verifyInsert(2, "nothing2", stringList, stringStandard);
            verifyInsert(5, "nothing5", stringList, stringStandard);
            verifyInsert(10, "nothing10", stringList, stringStandard);
            verifyInsert(1, "nothing1", stringList, stringStandard);
            verifyInsert(1, "nothing1-b", stringList, stringStandard);
            verifyInsert(0, "nothing0-a", stringList, stringStandard);
            verifyInsert(0, "nothing0-b", stringList, stringStandard);
            verifyInsert(stringList.length-1, "last-a", stringList, stringStandard);
            verifyInsert(stringList.length-1, "last-b", stringList, stringStandard);

            var numberStandard = Array.from(numberBase);
            verifyInsert(2, -10, numberList, numberStandard);
            verifyInsert(8, -1, numberList, numberStandard);
            verifyInsert(9, 100, numberList, numberStandard);
            verifyInsert(1, -900, numberList, numberStandard);
            verifyInsert(5, -70, numberList, numberStandard);
        });
    });

    describe(".remove(index)", function() {
        var errorTesterRemove = testers.error('remove', [null], 0);

        function verifyRemove(index, testList, standard) {
            standard.splice(index, 1);
            testList.remove(index);
            testers.array(testList, standard);
        }

        it("should not accept non number indexes", function() {
            indexTester("Type", errorTesterRemove, stringList);
        });

        it("should not accept a negative index", function() {
            indexTester("Lower", errorTesterRemove, stringList);
        });

        it("should not accept an index past length-1", function() {
            indexTester("Upper", errorTesterRemove, stringList);
        });

        it("should remove the specified node", function() {
            var stringStandard = Array.from(stringBase);
            verifyRemove(5, stringList, stringStandard);
            verifyRemove(stringList.length-1, stringList, stringStandard);

            var numberStandard = Array.from(numberBase);
            verifyRemove(5, numberList, numberStandard);
        });
    });

    describe(".unshift(data)", function() {
        var verifyUnshift = testers.functionBehavior('unshift');

        it("should add a node to the beginning of the list", function() {
            var stringStandard = Array.from(stringBase);
            while (stringList.length < 20) {
                verifyUnshift([{value: "unique"}], stringList, stringStandard);
            }

            var numberStandard = Array.from(numberBase);
            while (numberList.length < 20) {
                verifyUnshift([{value: "unique"}], numberList, numberStandard);
            }
        });
    });

    describe(".push(data)", function() {
        var verifyPush = testers.functionBehavior('push');

        it("should add a node to the end of the list", function() {
            var stringStandard = Array.from(stringBase);
            while (stringList.length < 20) {
                verifyPush([{value: "unique"}], stringList, stringStandard);
            }

            var numberStandard = Array.from(numberBase);
            while (numberList.length < 20) {
                verifyPush([{value: "unique"}], numberList, numberStandard);
            }
        });
    });

    describe(".shift()", function() {
        var verifyShift = testers.functionBehavior('shift');

        it("should remove the node at the beginning of the list", function() {
            var stringStandard = Array.from(stringBase);
            while (stringList.length > 0) {
                verifyShift([], stringList, stringStandard);
            }

            var numberStandard = Array.from(numberBase);
            while (numberList.length > 0) {
                verifyShift([], numberList, numberStandard);
            }
        });
    });

    describe(".pop()", function() {
        var verifyPop = testers.functionBehavior("pop");

        it("should remove the node at the end of the list", function() {
            var stringStandard = Array.from(stringBase);
            while (stringList.length > 0) {
                verifyPop([], stringList, stringStandard);
            }

            var numberStandard = Array.from(numberBase);
            while (numberList.length > 0) {
                verifyPop([], numberList, numberStandard);
            }
        });
    });
});
