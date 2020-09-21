const turnsModel = require('../model/turns');

module.exports = {
    insert: function(opts, cb) {
        return turnsModel.insert(opts, cb);
    }
}