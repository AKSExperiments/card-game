const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'abhi',
  password : 'paytm@197',
  database : 'cardGame'
});

module.exports = connection;