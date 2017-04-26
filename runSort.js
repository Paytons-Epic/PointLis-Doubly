var doubly = require('./doublyLinkedList');

//var testList = new doubly(5, 4, 6, 3, 7, 2, 8, 1, 9);
//var testList = new doubly(1, 10, 12, 5, 6, 7, 11, 4, 2, 8, 13, 9, 3);

//var arraysTest = [1, 10, 12, 5, 6, 7, 11, 4, 2, 8, 13, 9, 3];
//console.log(arraysTest.toString());
//var arraysSorted = arraysTest.sort(function(a, b) { return a-b; });
//console.log(arraysSorted);
//var linkedTest = new doubly(1, 10, 12, 5, 6, 7, 11, 4, 2, 8, 13, 9, 3);
//linkedTest.heapSort();
//console.log("\n\n\nFinal Results", linkedTest.toString());

/*
var list0 = new doubly();
var list1 = new doubly(1, 10, 12, 5, 6, 7, 11, 4, 2, 8, 13, 9, 3);
var list2 = new doubly(1, 10, 12, 5, 6, 7, 11, 4, 2, 8, 13, 9, 3);

console.log("none         ", list1.slice(2, 3).toString());

//console.log(list1.concat(["HI", "stuff", "things"]).toString());
console.log("all          ", list1.toString());
console.log("to end       ", list1.slice(2).toString());
console.log("negative end ", list1.slice(2, -1).toString());
console.log("three        ", list1.slice(2, 5).toString());
console.log("two          ", list1.slice(2, 4).toString());
console.log("one          ", list1.slice(2, 3).toString());
console.log("6            ", list1.slice(0, 5).toString());
console.log("5            ", list1.slice(0, 4).toString());
console.log("12           ", list1.slice(0, 3).toString());
console.log("none         ", list1.slice(2, 2).toString());

console.log("all          ", arraysTest.toString());
console.log("to end       ", arraysTest.slice(2).toString());
console.log("negative end ", arraysTest.slice(2, -1).toString());
console.log("three        ", arraysTest.slice(2, 5).toString());
console.log("two          ", arraysTest.slice(2, 4).toString());
console.log("one          ", arraysTest.slice(2, 3).toString());
console.log("6            ", arraysTest.slice(0, 5).toString());
console.log("5            ", arraysTest.slice(0, 4).toString());
console.log("12           ", arraysTest.slice(0, 3).toString());
console.log("none         ", arraysTest.slice(2, 2).toString());

console.log("\n\n\none          ", arraysTest.slice(2, 3).toString());
console.log("one          ", arraysTest.slice(2, 3).toLocaleString());
*/

/*
var linkedSorted = [];
for(var i=linkedTest.length-1; i>=0; i--) {
    linkedSorted.push(linkedTest[i]);
    //if(arraysSorted[i] !== linkedTest[i]) {
        //console.log("error at: ", i, " arrays: ", arraysSorted[i], " linked: ", linkedTest[i]);
        //return;
    //}
}*/

//console.log("\n\n", linkedSorted);

//[].forEach(function(length) {
//[10].forEach(function(length) {
//[100].forEach(function(length) {
[
    100000
    //1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,
    //10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000,
    //100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000,
].forEach(function(length) {
    //var arraysTest = [];
    var heapTest = new doubly();
    //var singleTest = new doubly();
    //var doubleTest = new doubly();
    //var linkedTest = new doubly();

    var item;
    for (var i=length; i>0; i--) {
        //heapTest.push(Math.random());
        item = Math.random();

        //arraysTest.push(item);
        //linkedTest.push(item);
        heapTest.push(item);
        /*
        singleTest.push(item);
        doubleTest.push(item);
        */
    }

    //var arraysSorted = arraysTest.sort(function(a, b) { return a-b; });

    //var arrays = arraysTest.sort(function(a, b) { return a-b; });
    //console.log("\nlength: ", length);
    //var arraysTime = timeExec(() => arraysTest.sort(), this, function(a, b) { return a-b; });
    //var linkedTime = timeExec(() => linkedTest.sort());
    var heapTime = timeExec(() => heapTest.heapSort(), this);
    //var singleTime = timeExec(() => singleTest.singleSort(), this);
    //var doubleTime = timeExec(() => doubleTest.doubleSort(), this);

    /*for(var i=arrays.length-1; i>=0; i--) {
        if (arrays[i] !== heapTest[i]) { return console.log("ERRoR", i, arrays[i], heapTest[i]); }
    }*/

    //return;
    console.log(
        //"\nlength: ", length,
        //"\narrays: ", arraysTime, "ms",
        //"\nlinked: ", linkedTime, "ms",
        "\nheap:   ", heapTime, "ms",
        //"\nsingle: ", singleTime, "ms",
        //"\ndouble: ", doubleTime, "ms",
        "\n"
    );
});

function timeExec(fn, ctx, ...args) {
    var t0 = process.hrtime();
    fn.call(ctx, ...args);
    return (d => d[0]*1000 + d[1]/1000000)(process.hrtime(t0));
}
