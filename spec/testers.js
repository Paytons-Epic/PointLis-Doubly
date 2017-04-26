'use strict';

function buildFunctionTester(handle) {
    return function(args, list, standard) {
        expect(list[handle](...args)).toBe(standard[handle](...args));
        compareListToArray(list, standard);
    }
}

function buildGetterTester() {
    return function(index, list, standard) {
        // expect list to match standard
        expect(list[index]).toBe(standard[index]);

        // expect different versions of the index to evaluate to the same item
        expect(list[[index]]).toBe(standard[index]);
        expect(list[index.toString()]).toBe(standard[index]);
    }
}

function buildSetterTester() {
    return function(index, value, list, standard) {
        var unique;

        unique = value;
        expect(list[index]=unique).toBe(standard[index]=unique);
        compareListToArray(list, standard);

        unique = "array" + value;
        expect(list[[index]]=unique).toBe(standard[index]=unique);
        compareListToArray(list, standard);

        unique = "string" + value;
        expect(list[''+index]=unique).toBe(standard[index]=unique);
        compareListToArray(list, standard);
    }
}

function buildErrorTester(func, testArgs, pos) {
    var args = Array.from(testArgs);

    return function(obj, testValue, err) {
        args[pos] = testValue;
        expect(function() { obj[func](...args) }).toThrowError(err);
    }
}

function buildIndexSetTester() {
    const testTypes = {
        "Type": {
            inputs: [{1:1}, null, undefined],
            error: "index must be a number",
        },
        "Lower": {
            inputs: [-1, -2, -10, -18374],
            error: "index out of range",
        },
        "Upper": {
            inputs: [1, 10, 2740],
            error: "index out of range",
            mapper: lengthAdder,
        },
    }

    function lengthAdder(list, params) {
        return params.inputs.map(function(a) { return list.length+a; });
    }

    function testIndex(type, tester, list) {
        if (!(type in testTypes)) { throw "invalid test type"; }

        var params = testTypes[type];
        var inputs = ("mapper" in params) ?
            params.mapper(list, params) :
            params.inputs;
        inputs.forEach(buildIndexTester(tester, list, params.error));
    }

    function buildIndexTester(func, list, err) {
        return function(value) {
            func(list, value, err);
        }
    }

    return testIndex;
};

function compareListToArray(list, array) {
    expect(list.length).toBe(array.length);

    var forwardComparator = buildListComparator('head', 'next');
    var reverseComparator = buildListComparator('tail', 'prev');

    forwardComparator(list, array);
    reverseComparator(list, Array.from(array).reverse());
}

function buildListComparator(root, jump) {
    return function(list, array) {
        array.forEach(buildCompareIncrementor(list, root, jump));
    }
}

function buildCompareIncrementor(list, root, jump) {
    var current = null;

    return function(item) {
        if (current === null) { current = list[root]; }
        expect(current.data).toBe(item);
        current = current[jump];
    };
}

module.exports.index = buildIndexSetTester;
module.exports.functionBehavior = buildFunctionTester;
module.exports.getter = buildGetterTester;
module.exports.setter = buildSetterTester;
module.exports.error = buildErrorTester;
module.exports.array = compareListToArray;
