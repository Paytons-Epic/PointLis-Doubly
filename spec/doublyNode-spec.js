//#!javascript
// spec/listNode-spec.js

var doublyNode = require("../doublyNode");

describe("doublyNode", function () {
    var node;

    beforeEach(function() {
        node = new doublyNode("stuff");
    });

    describe("constructor", function() {
        it("should create a new object", function () {
            var node = new doublyNode("");
            expect(typeof(node)).toBe('object');
        });

        it("should set the initial data to the passed value", function() {
            var is = { value: "is unique"};
            var isNot = { value: "is unique"};

            var node = new doublyNode(is);

            expect(node.data).toBe(is);
            expect(node.data).not.toBe(isNot);
        });

        it("should initialize next to null", function() {
            //var node = new doublyNode("stuff");
            expect(node.next).toBeNull();
        });

        it("should initialize prev to null", function() {
            //var node = new doublyNode("stuff");
            expect(node.prev).toBeNull();
        });
    });

    describe("next (getter)", function () {
        it("should return a node", function() {
            var first = new doublyNode("");
            var last = new doublyNode("");

            expect(first.next).toBeNull();

            first.next = last;
            expect(first.next instanceof doublyNode).toBeTruthy();
        });

        it("should get the next node", function() {
            var first = new doublyNode("");
            var middle = new doublyNode("");
            var last = new doublyNode("");

            first.next = middle;
            middle.next = last;
            last.next = first;

            expect(first.next).toBe(middle);
            expect(middle.next).toBe(last);
            expect(last.next).toBe(first);

            first.next = null;
            middle.next = null;
            last.next = null;

            expect(first.next).toBeNull();
            expect(middle.next).toBeNull();
            expect(last.next).toBeNull();
        });
    });

    describe("next (setter)", function () {
        it("should not accept anything except a node or nothing as input", function() {
            var node = new doublyNode("");

            expect(function() { node.next = ""; })
                .toThrowError("'_next' must be an instance of doublyNode");
            expect(function() { node.next = []; }).
                toThrowError("'_next' must be an instance of doublyNode");
            expect(function() { node.next = {}; })
                .toThrowError("'_next' must be an instance of doublyNode");
        });

        it("should set null when null is set", function() {
            var node = new doublyNode("");
            var other = new doublyNode("");

            node.next = other;
            expect(node.next).not.toBe(null);

            node.next = null;
            expect(node.next).toBe(null);
        });

        it("should set the next node", function() {
            var first = new doublyNode("");
            var middle = new doublyNode("");
            var last = new doublyNode("");

            first.next = middle;
            middle.next = last;
            last.next = first;

            expect(first.next).toBe(middle);
            expect(middle.next).toBe(last);
            expect(last.next).toBe(first);

            first.next = null;
            middle.next = null;
            last.next = null;

            expect(first.next).toBeNull();
            expect(middle.next).toBeNull();
            expect(last.next).toBeNull();
        });
    });

    describe("prev (getter)", function () {
        it("should return a node", function() {
            var first = new doublyNode("");
            var last = new doublyNode("");

            expect(last.prev).toBeNull();

            last.prev = first;
            expect(last.prev instanceof doublyNode).toBeTruthy();
        });

        it("should get the previous node", function() {
            var first = new doublyNode("");
            var middle = new doublyNode("");
            var last = new doublyNode("");

            first.prev = last;
            middle.prev = first;
            last.prev = middle;

            expect(first.prev).toBe(last);
            expect(middle.prev).toBe(first);
            expect(last.prev).toBe(middle);

            first.prev = null;
            middle.prev = null;
            last.prev = null;

            expect(first.prev).toBeNull();
            expect(middle.prev).toBeNull();
            expect(last.prev).toBeNull();
        });
    });

    describe("prev (setter)", function () {
        it("should set prev to null when null is set", function() {
            var node = new doublyNode("");
            var other = new doublyNode("");

            node.prev = other;
            expect(node.prev).not.toBe(null);

            node.prev = null
            expect(node.prev).toBe(null);
        });

        it("should not accept anything except a node as input", function() {
            var node = new doublyNode("");
            expect(function() {
                node.prev = "";
            }).toThrowError("'_prev' must be an instance of doublyNode");
            expect(function() {
                node.prev = [];
            }).toThrowError("'_prev' must be an instance of doublyNode");
            expect(function() {
                node.prev = {};
            }).toThrowError("'_prev' must be an instance of doublyNode");
        });

        it("should set the previous node", function() {
            var first = new doublyNode("");
            var middle = new doublyNode("");
            var last = new doublyNode("");

            first.prev = last;
            middle.prev = first;
            last.prev = middle;

            expect(first.prev).toBe(last);
            expect(middle.prev).toBe(first);
            expect(last.prev).toBe(middle);

        });

        it("should set previous node to null when no arg is passed", function() {
            var first = new doublyNode("");
            var middle = new doublyNode("");
            var last = new doublyNode("");

            first.prev = last;
            middle.prev = first;
            last.prev = middle;

            expect(first.prev).not.toBeNull();
            expect(middle.prev).not.toBeNull();
            expect(last.prev).not.toBeNull();

            first.prev = null;
            middle.prev = null;
            last.prev = null;

            expect(first.prev).toBeNull();
            expect(middle.prev).toBeNull();
            expect(last.prev).toBeNull();
        });
    });

    describe("destroy()", function() {
        it("should not allow getting 'data'", function() {
            expect(function() {node.data}).not
                .toThrowError('this node has been destroyed');
            node.destroy();
            expect(function() {node.data})
                .toThrowError('this node has been destroyed');
        });

        it("should not allow setting 'data'", function() {
            expect(function() {node.data = "anything"}).not
                .toThrowError('this node has been destroyed');
            node.destroy();
            expect(function() {node.data = "anything"})
                .toThrowError('this node has been destroyed');
        });

        it("should not allow getting 'next'", function() {
            expect(function() {node.next}).not
                .toThrowError('this node has been destroyed');
            node.destroy();
            expect(function() {node.next})
                .toThrowError('this node has been destroyed');
        });

        it("should not allow setting 'next'", function() {
            expect(function() {node.next = "anything"}).not
                .toThrowError('this node has been destroyed');
            node.destroy();
            expect(function() {node.next = "anything"})
                .toThrowError('this node has been destroyed');
        });

        it("should not allow getting 'prev'", function() {
            expect(function() {node.prev}).not
                .toThrowError('this node has been destroyed');
            node.destroy();
            expect(function() {node.prev})
                .toThrowError('this node has been destroyed');
        });

        it("should not allow setting 'prev'", function() {
            expect(function() {node.prev = "anything"}).not
                .toThrowError('this node has been destroyed');
            node.destroy();
            expect(function() {node.prev = "anything"})
                .toThrowError('this node has been destroyed');
        });
    });
});
