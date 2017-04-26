//#!javascript
// spec/interfaceMethods-spec.js
'use strict';

var doublyLinkedList = require("../doublyLinkedList");

describe("doublyLinkedList", function () {
    function hasFunctions(obj, ...args) {
        args.forEach(buildHasFunction(obj));
    }

    function buildHasFunction(obj) {
        return function(name) {
            it("should include " + name, function() {
                expect(typeof(obj[name])).toBe('function');
            });
        }
    }

    describe("Accessor methods", function() {
        hasFunctions(new doublyLinkedList(),
            "concat", "indexOf", "join", "lastIndexOf", "slice",
            "toString", "toLocaleString"
        );
    });

    describe("Mutator methods", function() {
        hasFunctions(new doublyLinkedList(),
            "copyWithin", "fill", "pop", "push", "reverse", "shift", "sort",
            "splice", "unshift"
        );
    });

    describe("Iteration methods", function() {
        hasFunctions(new doublyLinkedList(),
            "entries", "every", "filter", "find", "findIndex", "forEach",
            "keys", "reduce", "reduceRight", "some", "values"
        );
    });

    describe("Non-Standard methods", function() {
        hasFunctions(new doublyLinkedList(),
            "includes", "insert", "remove", "toSource"
        );
    });
});
