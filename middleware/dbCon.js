const mysql = require('mysql')

exports.con = mysql.createConnection({
    host: '127.0.0.1',
    user: '',
    password: '',
    database: '', //'',
    charset: 'utf8mb4'
})
console.log('database connected!')
