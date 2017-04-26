'use strict';

module.exports = node;

function node(data) {
    this._data = data;
    this._next = null;
    this._prev = null;

    this._isAlive = true;
}

/**************** Property getters/setters ****************/

Object.defineProperty(node.prototype, 'data', {
    get: getData,
    set: setData,
});

Object.defineProperty(node.prototype, 'next', {
    get: buildLinkGetter('_next'),
    set: buildLinkSetter('_next'),
});

Object.defineProperty(node.prototype, 'prev', {
    get: buildLinkGetter('_prev'),
    set: buildLinkSetter('_prev'),
});

/**************** Public Functions ****************/

node.prototype.destroy = function() {
    this._isAlive = false;

    delete this._data;
    delete this._next;
    delete this._prev;
}

/**************** Private Functions ****************/

function isAlive() {
    if (this._isAlive === true) { return; }
    throw new Error("this node has been destroyed");
}

function getData() {
    isAlive.call(this);
    return this._data;
}

function setData(value) {
    isAlive.call(this);
    return this._data = value;
}

function buildLinkGetter(linkName) {
    return function() {
        isAlive.call(this);
        if (this[linkName] === null) { return null; }

        if (!(this[linkName] instanceof node)) {
            throw new Error("'" + linkName + "' is not a node");
        }

        return this[linkName];
    }
}

function buildLinkSetter(linkName) {
    return function(value) {
        isAlive.call(this);
        if (value===null || value===undefined) { return this[linkName] = null; }

        if (!(value instanceof node)) {
            throw new Error("'"+linkName+"' must be an instance of doublyNode");
        }

        return this[linkName] = value;
    }
}
