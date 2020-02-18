const express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    multer = require('multer'),
    fs = require('fs'),
    path = require('path'),
    db = require('../middleware/dbCon'),
    router = express.Router(),
    auth = require('../middleware/auth');

const sharp = require('sharp');

router.use(bodyParser.json({ limit: '10mb' }))
router.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb'
}))

router.use(function (req, res, next) {
    /*****  Allow only selectd origin  *******/
    /*    
    var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];
     var origin = req.headers.origin;
     if (allowedOrigins.indexOf(origin) > -1) {
       res.setHeader('Access-Control-Allow-Origin', origin);
     }
     */
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST"
        //, OPTIONS, PUT, PATCH, DELETE
    );
    next();
});



/**************************************
 * User Login And Register Section
 * *************************************/

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/user')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))

        // + path.extname(file.originalname)
    }
});
var upload = multer({
    storage: storage,
    limits: { fileSize: 9000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
})
function checkFileType(file, cb) {
    var filetypes = /jpeg|jpg|png|gif/;
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    var mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        //cb('Error: Images Only!');
        console.log('images Only');
    }
}

router.post('/registerUser', upload.single('user_image'), (req, res) => {
    const sqlQ = `INSERT INTO registration
    (username, login_mode, email, password, access_token, Mobile_number, gender, age, city, country, profile_image, created_datetime, last_login, otp_msg) VALUES((?), 'website', (?), md5(?), '', (?), (?), (?), (?), (?), (?), current_timestamp(), current_timestamp(), '0')`

    db.con.query(sqlQ, [req.body.username, req.body.email, req.body.password, req.body.mob_no, req.body.gender, req.body.age, req.body.city, req.body.country, req.file.filename], (err, result) => {
        if (err) {
            console.log(err)
            fs.unlink(`images/user/${req.file.filename}`, function (err) {
                if (err) {
                    console.log('err')
                }
                console.log('file deleted successfully');
            });

            res.send('err')
        } else {

            console.log(parseInt(result.affectedRows) == 1)
            if (parseInt(result.affectedRows) == 1) {
                jwt.sign({ email: req.body.email }, 'key', function (err, token) {
                    if (err) {
                        console.log(err);

                        res.send('err')
                    } else
                        res.json({
                            token: token,
                            msg: 'login successfully'
                        })
                })
            } else {
                res.send('err')
            }

        }

    })
})

router.post('/login', (req, res) => {
    const sqlQ = `select * from registration where email=(?)`
    db.con.query(sqlQ, [req.body.email], (err, result) => {
        if (err) {
            res.send('err')
        } else if (!result.length) {
            res.send('err')
        } else {
            // console.log(result[0].email)
            const sqlQ = `select * from registration where email=(?) and password=md5(?)`
            db.con.query(sqlQ, [req.body.email, req.body.password], (err, result) => {
                if (err) {
                    res.send('err')
                } else if (!result.length) {
                    res.send('err')
                } else {
                    // console.log(result[0].email)
                    const sqlQ = `update registration set last_login=current_timestamp() where email=(?)`
                    db.con.query(sqlQ, [req.body.email], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send('err')
                        }
                        else {
                            jwt.sign({ email: req.body.email }, 'key', function (err, token) {
                                res.json({
                                    token: token,
                                    msg: 'login successfully'
                                })
                            })
                        }
                    })
                }
            })
        }
    })
})

router.post('/userDetails', auth, (req, res) => {
    // console.log(req.body);
    jwt.verify(req.token, 'key', function (err, result) {
        if (err) {
            res.send('err')
        } else {

            const user_email = result.email;

            const sqlQ = `select distinct email,username,profile_image,Mobile_number,age,gender,country,city,login_mode from registration where email=(?)`
            db.con.query(sqlQ, [user_email], (err, result) => {
                if (err) {
                    // console.log(err)
                    res.send('err')
                }
                else {
                    res.send(result)
                }
            })
        }
    })
})
router.post('/updatePassword', auth, (req, res) => {
    // console.log(req.body);
    jwt.verify(req.token, 'key', function (err, result) {
        if (err) {
            res.send('err')
        } else {
            //console.log(result.email);
            const user_email = result.email;
            if (user_email === req.body.email) {
                const sqlQ = `update registration set password=md5(?) where email=(?)`
                db.con.query(sqlQ, [req.body.password, user_email], (err, result) => {
                    if (err) {
                        // console.log(err)
                        res.send('err')
                    }
                    else {
                        res.send('password update successfully')
                    }
                })
            } else {
                res.send('err')
            }
        }
    })
})


/**************************************
 * User Login And Register Section End
 * *************************************/

/**************************************
* User Add, Update, Delete and Get Data
* *************************************/





/**************************************
* User Add, Update, Delete and Get Data End
* *************************************/

module.exports = router;