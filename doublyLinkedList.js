'use strict';
module.exports = doublyLinkedList;

var doublyNode = require("./doublyNode");
var NotImplementedError = require("./NotImplemented");

const jumps = {head: {fwd: "next", rev:"prev"}, tail: {fwd: "prev", rev:"next"}}

function doublyLinkedList(...args) {
    this._length = 0;
    this.head = this.tail = null;

    args.forEach(this.push.bind(this));

    return new Proxy(this, { get: proxyGet, set: proxySet });
}

Object.defineProperty(doublyLinkedList.prototype, "length", {
    get: getLength,
    set: setLength,
});

/**************** Dynamicall Generated Private Functions ****************/

var nodeUnshift = buildRootNodePush('head');
var nodeShift = buildRootNodePop('head');
var nodePop = buildRootNodePop('tail');
var nodePush = buildRootNodePush('tail');

/**************** Array Mutator Functions ****************/

doublyLinkedList.prototype.copyWithin = function(target, start, end) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.fill = function(value, start, end) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.pop = buildRootPop('tail');

doublyLinkedList.prototype.push = buildRootPush('tail');

doublyLinkedList.prototype.reverse = function() {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.shift = buildRootPop('head');

doublyLinkedList.prototype.sort = function() {
    heapUnstack.call(this, heapStack.call(this));
}

doublyLinkedList.prototype.heapSort = function() {
    heapUnstack.call(this, heapStack.call(this));
}

doublyLinkedList.prototype.singleSort = function() {
    var stacks = singleStack.call(this);
    heapUnstack.call(this, stacks);
}

doublyLinkedList.prototype.doubleSort = function() {
    var stacks = doubleStack.call(this);
    heapUnstack.call(this, stacks);
}

doublyLinkedList.prototype.splice = function(start, deleteCount, ...args) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.unshift = buildRootPush('head');

/**************** Array Accessor Functions ****************/

doublyLinkedList.prototype.concat = function(list) {
    var output = new doublyLinkedList();

    for(let item of this) { output.push(item); }
    for(let item of list) { output.push(item); }

    return output;
};

doublyLinkedList.prototype.indexOf = function(value) {
    var index = 0;
    var node = this.head;

    while (node.next) {
        if(node.data === value) { return index; }
        node = node.next;
        index++;
    }

    if(node.data === value) { return index; }
    return -1;
};

doublyLinkedList.prototype.join = function(joiner) {
    return [...this].join(joiner);
};

doublyLinkedList.prototype.lastIndexOf = function(value) {
    var index = this.length-1;
    var node = this.tail;

    while (node._prev) {
        if(node.data === value) { return index; }
        node = node._prev;
        index--;
    }

    if(node.data === value) { return index; }
    return -1;
};

doublyLinkedList.prototype.slice = function(start, end) {
    var output = new doublyLinkedList();

    start = start || 0;
    end = end || this.length;

    if (start < 0) { start = this.length + start; }
    if (end < 0) { end = this.length + end; }

    if (start < 0 || end < 0) { throw new Error("index out of range"); }

    var node = getNodeAt.call(this, start);
    for(var i=end-start; i>1 && node.next; i--) {
        output.push(node.data);
        node = node.next;
    }

    if ((end-start) > 0) { output.push(node.data); }

    return output;
};

doublyLinkedList.prototype.toString = function() {
    return this.join(",");
};

doublyLinkedList.prototype.toLocaleString = function(args) {
    throw new NotImplementedError;
};

/**************** Iteration Public Methods ****************/

doublyLinkedList.prototype.entries = function(args) {
    throw new notimplementederror;
};

doublyLinkedList.prototype.every = function(args) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.filter = function(args) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.find = function(args) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.findIndex = function(args) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.forEach = function(args) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.map = function(fn) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.keys = function(args) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.reduce = function(args) {
    throw new NotImplementedError();
};

doublyLinkedList.prototype.reduceRight = function(args) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.some = function(args) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.values = function(args) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype[Symbol.iterator] = function* () {
    if (!this.head) { return ;}

    var node = this.head;
    while(node.next) {
        yield node.data;
        node = node.next;
    }

    yield node.data;
};

/**************** Non-Standard Public Methods ****************/

doublyLinkedList.prototype.includes = function(args) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.toSource = function(args) {
    throw new NotImplementedError;
};

doublyLinkedList.prototype.insert = function(index, value) {
    if (typeof(index) === 'number') { isInRange(index, this._length); }

    if (!isIndex(index)) {
        throw new Error("index must be a number");
    };
    //testIndex.call(this, index);

    if(index === 0) {
        this.unshift(value);
    } else {
        insert.call(this, index, value);
    }
};

doublyLinkedList.prototype.remove = function(index) {
    if (typeof(index) === 'number') { isInRange(index, this._length); }
    if (!isIndex(index)) {
        throw new Error("index must be a number");
    };
    //testIndex.call(this, index);

    if(index === 0) {
        this.shift();
    } else if (index === this._length-1) {
        this.pop();
    } else {
        remove.call(this, index);
    }
};

/**************** Builder Functions ****************/

//var getNodeFromHead = getNodeFromRoot('head');
//var getNodeFromTail = getNodeFromRoot('tail');
function getNodeFromRoot(root) {
    var jump = jumps[root];
    if (!jump) { throw new Error("buildRootPush accepts 'head' and 'tail'"); }

    var first = jump.root;
    var fwd = jump.fwd;
    return function(count) {
        var currentNode = this[first];
        for (var i=count; i>0; i--) { currentNode = currentNode[fwd]; }
        return currentNode;
    }
}

function buildRootIndexOf(root) {
    var jump = jumps[root];
    if (!jump) { throw new Error("buildRootPop accepts 'head' and 'tail'"); }

    var first = jump.root;
    var fwd = jump.fwd;
    return function() {
        var index = this.length-1;
        var node = this[first];

        while (node[fwd]) {
            if(node.data === value) { return index; }
            node = node[fwd];
            index--;
        }

        if(node.data === value) { return index; }
        return -1;
    }
};

function buildRootNodePop(root) {
    var jump = jumps[root];
    if (!jump) { throw new Error("buildRootPop accepts 'head' and 'tail'"); }

    var first = jump.root;
    var fwd = jump.fwd;
    var rev = jump.rev;
    return function() {
        if (this.tail === this.head) { return popLastNode.call(this); }

        var oldRoot = this[first]; //var node = this[first];
        var newRoot = oldRoot[fwd];
        this[first] = newRoot; //this[first] = this[first][fwd];
        oldRoot.next = oldRoot.prev = null;

        newRoot[rev] = null; //this[first][rev] = null;

        /*var node = this[first];
        this[first] = this[first][fwd];

        node.next = node.prev = null;
        this[first][rev] = null;*/

        this._length -= 1;
        return oldRoot;
    }
}

function buildRootPop(root) {
    var jump = jumps[root];
    if (!jump) { throw new Error("buildRootPop accepts 'head' and 'tail'"); }

    var first = jump.root;
    var fwd = jump.fwd;
    var rev = jump.rev;
    return function() {
        if (this.tail === this.head) { return popLast.call(this); }

        var oldRoot = this[first];
        var newRoot = oldRoot[fwd];
        this[first] = newRoot;

        newRoot[rev] = null;

        var value = oldRoot.data;
        oldRoot.destroy();

        /*var value = this[first].data;
        this[first] = this[first][fwd];
        this[first][rev].destroy();
        this[first][rev] = null;*/

        this._length -= 1;
        return value;
    }
}

function buildRootNodePush(root) {
    var jump = jumps[root];
    if (!jump) { throw new Error("buildRootPush accepts 'head' and 'tail'"); }

    var first = jump.root;
    var fwd = jump.fwd;
    var rev = jump.rev;
    return function(newNode) {
        if (this._length === 0) { return pushFirstNode.call(this, node); }

        // Create Node
        var rootNode = this[first];
        // Assign Reverse Link old->new
        rootNode[rev] = newNode;
        // Assign Forward Link new->old
        newNode[fwd] = rootNode;
        newNode[rev] = null;
        // Update root reference
        this[first] = newNode;

        //this[first][rev] = node;
        //this[first][rev][fwd] = this[first];
        //this[first] = this[first][rev];
        //this[first][rev] = null;
        return this._length += 1;
    }
}

function buildRootPush(root) {
    var jump = jumps[root];
    if (!jump) { throw new Error("buildRootPush accepts 'head' and 'tail'"); }

    var first = jump.root;
    var fwd = jump.fwd;
    var rev = jump.rev;
    return function(value) {
        if (this._length === 0) { return pushFirst.call(this, value); }

        // Create Node
        var newNode = new doublyNode(value);
        var rootNode = this[first];
        // Assign Reverse Link old->new
        rootNode[rev] = newNode;
        // Assign Forward Link new->old
        newNode[fwd] = rootNode;
        // Update root reference
        this[first] = newNode;

        //this[first][rev] = new doublyNode(value);
        //this[first][rev][fwd] = this[first];
        //this[first] = this[first][rev];

        return this._length += 1;
    }
}

/**************** Private Functions ****************/

function proxyGet(obj, prop) {
    if (isIndex(prop)) {
        return get.call(obj, prop>>>0);
    }

    return obj[prop];
}

function proxySet(obj, prop, value, receiver) {
    if (isIndex(prop)) {
        set.call(obj, prop>>>0, value);
        return true;
    }

    obj[prop] = value;
    return true;
}

function get(index) {
    testIndex.call(this, index);

    return getNodeAt.call(this, index).data;
};

function set(index, value) {
    testIndex.call(this, index);

    getNodeAt.call(this, index).data = value;
    return value;
};

function getLength() {
    return this._length;
}

function setLength(value) {
    if (value < 0) {
        throw RangeError("Invalid array length");
    } else if (value < this._length) { // shrink the array
        // This method of shrinking explicity removes references which helps
        // remove reference cycles which would prevent GC disposal.
        // NOTE: This isn't really necessary given modern GC implementations
        //       but helps prevent memory leaks on IE6 and IE7.
        modLengthBy(this._length-value, this.pop.bind(this));

        // An alternative "off the cuff" method which has not be studied
        // TODO: Consider the following implementation
        //this._length = value;
        //this.tail = getNodeAt(this._length-1);
    } else if (value > this._length) { // grow the array
        modLengthBy(value-this._length, this.push.bind(this));
    } // else (value === this._length), so no change

    return value;
}

function modLengthBy(steps, func) {
    for (var i=steps; i>0; i--) { func(); }
}

function isIndex(value) {
    // Index Definition via ECMA-262 9.4.2
    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
    return ( typeof(value) !== 'symbol' ) &&
        ( typeof(value) !== 'undefined' ) &&
        ( value !== null ) &&
        ( (value>>>0).toString() === value.toString() ) &&
        ( (value>>>0) !== 2^32-1 );
}

function isInRange(index, length) {
    var value = Number(index);
    if (value >= 0 && value < length) {
        return;
    }

    throw new Error("index out of range");
}

function testIndex(index) {
    if (typeof(index) !== 'number') {
        throw new Error("index must be a number");
    }

    if ((index < 0) || (index > this._length-1)) {
        throw new Error("index out of range");
    }
}

function getNodeAt(index) {
    if (index <= (this._length-1)/2) {
        return getNodeFromHead.call(this, index);
    } else if (index > (this._length-1)/2) {
        return getNodeFromTail.call(this, this._length-1 - index);
    } //TODO: what happens if an out of range index is passed?
}

function getNodeFromHead(count) {
    var currentNode = this.head;
    for (var i=count; i>0; i--) { currentNode = currentNode.next; }

    return currentNode;
}

function getNodeFromTail(count) {
    var currentNode = this.tail;
    for (var i=count; i>0; i--) { currentNode = currentNode.prev; }

    return currentNode;
}

function insert(index, value) {
    var newNode = new doublyNode(value);
    var postNode = getNodeAt.call(this, index);

    newNode.next = postNode;
    newNode.prev = postNode.prev;

    newNode.prev.next = newNode;
    newNode.next.prev = newNode;

    this._length += 1;
}

function remove(index) {
    var deadNode = getNodeAt.call(this, index);

    var preNode = deadNode.prev;
    var postNode = deadNode.next;

    preNode.next = postNode;
    postNode.prev = preNode;

    this._length -= 1;
}

function pushFirst(value) {
    return pushFirstNode(new doublyNode(value);
}

function pushFirstNode(node) {
    if (this._length !== 0) { throw new Error("pushFirst shouldn't be called"); }

    node.next = node.prev = null;
    this.head = this.tail = node;
    return this._length = 1;
}

function popLast() {
    //TODO: Does the node need to be destroyed to prevent memory leaks?
    //var node = popLastNode();
    //var value = node.data;
    //node.destroy();
    //return value;
    return popLastNode().data;
}

function popLastNode() {
    if (this._length !== 1) { throw new Error("popLast shouldn't be called"); }

    var node = this.tail;
    node.next = node.prev = null;

    this.head = this.tail = null;

    this._length = 0;
    return node;
}

function heapStack() {
    var mins = [];

    var node;
    while (this.length > 0) {
        node = nodeShift.call(this);

        if (heapFrontAdds(node, mins)) {
        } else if (heapBackAdds(node, mins)) {
        } else {
            heapPush(node, mins);
        }
    }

    return mins;
}

function heapUnstack(stacks) {
    while (stacks.length > 0) {
        nodePush.call(this, stackedHeapNodePop(stacks));
    }
}

function singleStack() {
    var stacks = [];

    var item;
    while (this.length > 0) {
        item = this.shift();

        if (addFronts(item, stacks)) {
        } else {
            stacks.push(new doublyLinkedList(item));
        }
    }

    return stacks;
}

function doubleStack() {
    var stacks = [];

    var item;
    while (this.length > 0) {
        item = this.shift();

        if (addFronts(item, stacks)) {
        } else if (addBacks(item, stacks)) {
        } else {
            stacks.push(new doublyLinkedList(item));
        }
    }

    return stacks;
}

function heapPush(node, mins) {
    var newList = new doublyLinkedList();
    nodePush.call(newList, node);
    bubbleUp(mins, mins.push(newList)-1);
}

function heapFrontAdds(node, stacks) {
    if (stacks.length <= 0) { return false; }
    return heapFrontChecks(node, stacks.length-1, stacks[stacks.length-1],  stacks);
}

function heapFrontChecks(node, index, stack,  stacks) {
    if (node.data > stack[0]) {
        return false;
    }

    var iParent = ((index-1)/2) >>> 0;
    if (iParent === index) {
        nodeUnshift.call(stack, node);
        return true;
    }

    if (!heapFrontChecks(node, iParent, stacks[iParent], stacks)) {
        nodeUnshift.call(stack, node);
    }

    return true;
}

function heapBackAdds(node, stacks) {
    if (stacks.length <= 0) { return false; }
    return heapBackChecks(node, stacks.length-1, stacks[stacks.length-1], stacks);
}

function heapBackChecks(node, index, stack, stacks) {
    if (node.data < stack[stack.length-1]) {
        return false;
    }

    var iParent = ((index-1)/2) >>> 0;
    if (iParent === index) {
        nodePush.call(stack, node);
        return true;
    }

    if (!heapBackChecks(node, iParent, stacks[iParent], stacks)) {
        nodePush.call(stack, node);
    }

    return true;
}

function heapChecks(node, index, stacks) {
    if (node.data > stacks[index][0]) { return; }

    var iParent = ((index-1)/2) >>> 0;
    if (iParent === index) {
        return stacks[index];
    }

    return heapChecks(node, iParent, stacks) || stacks[index];
}

function addFronts(item, stacks) {
    if (stacks.length <= 0) { return false; }

    var stack = checkFronts(item, stacks);

    if (typeof(stack) !== 'undefined') {
        stack.unshift(item);
        return true;
    }

    return false;
}

function checkFronts(item, stacks) {
    var stack;
    for (var i=0; i < stacks.length; i++) {
        stack = stacks[i];
        if (item <= stack[0]) { return stack; }
    }

    return;
}

function addBacks(item, stacks) {
    if (stacks.length <= 0) { return false; }

    var stack = checkBacks(item, stacks);

    if (typeof(stack) !== 'undefined') {
        stack.push(item);
        return true;
    }

    return false;
}

function checkBacks(item, stacks) {
    var stack;
    for (var i=0; i < stacks.length; i++) {
        stack = stacks[i];
        if (item >= stack[stack.length-1]) {
            return stack;
        }
    }

    return;
}

function stackedHeapPop(heap) {
    var value = heap[0].shift();

    if(heap[0].length <= 0) {
        if (heap.length <= 1) {
            heap.pop();
            return value;
        }

        heap[0] = heap.pop();
    }

    bubbleDown(heap, 0);

    return value;
}

function stackedHeapNodePop(heap) {
    var node = nodeShift.call(heap[0]);

    if(heap[0].length <= 0) {
        if (heap.length <= 1) {
            heap.pop();
            return node;
        }

        heap[0] = heap.pop();
    }

    bubbleDown(heap, 0);

    return node;
}

function bubbleUp(heap, index) {
    var p = ((index-1)/2) >>> 0;
    if (p === index) { return; }

    var stack = heap[index];
    var pStack = heap[p];
    if(stack[0] < pStack[0]) {
        heap[index] = pStack;
        heap[p] = stack;

        bubbleUp(heap, p);
    }
}

function bubbleDown(heap, index) {
    var l = index*2+1
    var r = l+1;
    var lVal;
    var rVal;
    var swapIndex;
    var swapValue;

    if (r < heap.length) {
        var lVal = heap[l][0];
        var rVal = heap[r][0];
        if (lVal < rVal) {
            swapValue = lVal;
            swapIndex = l;
        } else {
            swapValue = rVal;
            swapIndex = r;
        }
    } else if(l < heap.length) {
        swapIndex = l;
        swapValue = heap[l][0];
    } else {
        return;
    }

    var stack = heap[index];
    if (swapValue < stack[0]) {
        heap[index] = heap[swapIndex];
        heap[swapIndex] = stack;
        bubbleDown(heap, swapIndex);
    }
}
