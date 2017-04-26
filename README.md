## Synopsis

PointLis-Doubly is a doubly linked list implementation in JavaScript. The initial goal is to implement all of the same interface methods as the standard Array class (not quite there yet). As the project grows beyond just an alternative array implementation, new functionality specific to linked lists will be added as well.

This project is (will be) part of a larger library, PointLis which will include other linked-list based implementations (Singly, Stack, Queue).

## Code Example

PointLis-Doubly mimics the Array class. 

Anything that is possible with an array should be possible with PointLis-Doubly. Any features which are not yet implemented will throw a NotImplementedError.

If you notice any behavior which is missing or incorrectly implemented, please let me know.

Examples:
```javascript
var doubly = require('PointLis-Doubly');
var blankList = new doubly();
var onesList = new doubly(1, 1, 1, 1, 1);
var funList = new doubly(1, 1, 2, 3, 5, 8);

onesList.push(1);
onesList.unshift(1); // do that 1 million times quickly with an array ;-)

while (funList.length <= 100) {
    var l = funList.length;
    funList.push(funList[l-2] + funList[l-1]);
}
```

*Note:* There is one small exception that should be mentioned. Currently list.sort(); will sort the array in-place as opposed to returning a new sorted Array. This is a bug I will fix shortly.

## Motivation

The PointLis project was started as practice writing tested code. The library itself was originally seen as fairly pointless, but as the project matures, it may become somewhat practical (The name won't change to PracticaLis though).

## Installation

Provide code examples and explanations of how to get the project.

## API Reference

(Please see the standard JavaScript Array interface documentation).

PointLis-Doubly also implements the following methods:

>####PointLis-Doubly.protype.insert(index, value);
insert data at the specified index
This is a temporary method because it was easier to implement an additional `insert()` method than perfect the splice behavior. Once `splice()` is implemented and fully tested, this method will insert itself into the garbage.
>####PointLis-Doubly.protype.remove(index);
`remove()` data at the specified index
This is a temporary method because it was easier to implement an additional remove method than perfect the splice behavior. Once `splice()` is implemented and fully tested, this method will be remove itself.
>####PointLis-Doubly.protype.singleSort();
a version of sort that uses single-sided stacks stored in a list
>####PointLis-Doubly.protype.doubleSort();
a version of sort that uses double-sided stacks stored in a list
>####PointLis-Doubly.protype.heapSort();
a version of sort that uses double-sided stacks stored in a heap
This is identical to PointLis-Doubly.prototype.sort();

## License

This project uses the standard MIT license.
