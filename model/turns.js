const ExpectationError = require('../lib/error').ExpectationError;
const connection = require('../lib/mysql');

const columns = ['id', 'room_id', 'player_id', 'card', 'created_at']

module.exports = {
    get: function(options, cb) {
        let filters = {};
        columns.forEach((col) => {
            if(options[col] !== undefined) {
                filters[col] = options[col];
            }
        });
        connection.connect();
        let filtersStr = "";
        Object.keys(filters).forEach((filter) => {
            filtersStr += filter + "=" + filters[filter] + " ";
        });
        connection.query(`SELECT ${options.col ? options.col.join(','): '*'} from rooms where ${filtersStr}`, function (error, results, fields) {
            return cb(error, results);
        });
        connection.end();
    },
    insert: function(options, cb) {
        let insertVal = {};
        columns.forEach((col) => {
            if(options[col] !== undefined) {
                insertVal[col] = options[col];
            }
        });
        connection.connect();
        let filtersStr = "";
        Object.keys(insertVal).forEach((filter) => {
            filtersStr += filter + "=" + filters[filter] + " ";
        });
        connection.query(`INSERT into rooms (${Object.keys(insertVal).join(',')}) values (${Object.entries(insertVal).join(',')})`, function (error, results, fields) {
            return cb(error, results);
        });
        connection.end();
    }
}

