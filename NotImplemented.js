function NotImplementedError() {
    this.stack = Error().stack.split('\n');
    this.stack.splice(1, 2);
    this.stack = this.stack.join('\n');
}

NotImplementedError.prototype = Object.create(Error.prototype);
NotImplementedError.prototype.name = 'NotImplementedError';
NotImplementedError.prototype.message = "This method is not yet implemented.";

module.exports = NotImplementedError;
