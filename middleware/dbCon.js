const mysql = require("mysql");

exports.con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "admin",
    database: "ng_db", //'',
    charset: "utf8mb4"
});

console.log("database connected!");