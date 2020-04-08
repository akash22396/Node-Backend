const express = require("express"),
  bodyParser = require("body-parser"),
  jwt = require("jsonwebtoken"),
  multer = require("multer"),
  fs = require("fs"),
  path = require("path"),
  db = require("../middleware/dbCon"),
  router = express.Router(),
  auth = require("../middleware/auth");

router.use(bodyParser.json({ limit: "10mb" }));
router.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb"
  })
);

router.use(function(req, res, next) {
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
    cb(null, "images/products");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );

    // + path.extname(file.originalname)
  }
});
var upload = multer({
  storage: storage,
  limits: { fileSize: 9000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});
function checkFileType(file, cb) {
  var filetypes = /jpeg|jpg|png|gif/;
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  var mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    //cb('Error: Images Only!');
    console.log("images Only");
  }
}

router.get("/", (req, res) => {
  res.send("products");
});

module.exports = router;
