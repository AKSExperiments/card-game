const ExpectationError = require('../lib/error').ExpectationError;
const connection = require('../lib/mysql');

const columns = ['id', 'participant_1', 'participant_2', 'created_at']

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
        connection.query('SELECT * from rooms where' + filters, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        });
        
        connection.end();
        
    },
    getByUser: function(options, cb) {
        if(!options.user_id) {
            return new ExpectationError('No user ID provided');
        }
        connection.connect();
        connection.query('SELECT id from rooms where participant_1=' + user_id +' OR participant_2=' + user_id + ' order by created_at desc limit 1', function (error, results, fields) {
            return cb(err, res);
        });
        connection.end();
    }
}

