const express = require('express'),
    bodyParser = require('body-parser'),

    multer = require('multer'),
    fs = require('fs'),
    path = require('path'),
    app = express(),
    db = require('./middleware/dbCon'),
    user = require('./router/user');

const host = process.env.PORT || 8000;


app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb'
}))

app.use(express.static(path.join(__dirname, "images/user/"), { maxAge: '360d' }));

app.use(function (req, res, next) {


    /* var allowedOrigins = [ 'http://127.0.0.1:3000', 'http://localhost:3000'];
     var origin = req.headers.origin;
     if (allowedOrigins.indexOf(origin) > -1) {
       res.setHeader('Access-Control-Allow-Origin', origin);
     }*/

    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST"
        // OPTIONS, PUT, PATCH, DELETE"
    );


    next();
});
app.get('/', (req, res) => {
    res.send('')
})

app.use('/user', user)

app.listen(host, () => console.log(`Server running on http://127.0.0.1:${host}`))
