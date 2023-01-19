const mysql = require('mysql2');
const pool  = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'nodedemo',
    password:'pratyush'
})

module.exports = pool.promise();
