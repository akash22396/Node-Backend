const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    var bearerHeader = req.headers['authorization'] || req.body.token || req.body.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
        var bearer = bearerHeader.split(' ');
        var bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send('err1')
    }
}
module.exports = auth