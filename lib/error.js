const util = require('util');

function ExpectationError(message) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message;
    this.status = 417;
    console.log(this);
}

util.inherits(ExpectationError, Error);

module.exports = {
    ExpectationError: ExpectationError,
};