const ExpectationError = require('../lib/error').ExpectationError;
module.exports = {
    validateParams: function(req, res, next) {
        if(!req.query) {
            req.query = {};
        }
        if(!req.cookies) {
            return next(new ExpectationError('Invalid Session'))
        }
    },
    validateUser: function(req, res, next) {

    },
    error: function(err, req, res, next) {
        var code = err.status || 500;
        var response = {
            error: err.message || err
        };

        if (err.data) {
            response.data = err.data;
        }
        if (err.url) {
            response.url = err.url;
        }
        res.status(code).json(response);
    },
    res: (req, res, next) => {
        res.json(req.data);
    }
}