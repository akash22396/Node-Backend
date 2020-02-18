const mysql = require('mysql')

exports.con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'loginSystem', //'loginSystem',
    charset: 'utf8mb4'
})
console.log('database connected!')