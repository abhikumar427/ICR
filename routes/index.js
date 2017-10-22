var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home' });
});

/* GET QR code sample. */
router.get('/qrcode', function(req, res, next) {
    res.render('qrcode', { title: 'Login using Usher QR Code' });
});
// app.get('/home', function (req, res,html) {
// //res.render('../views/index.html');
//   res.sendFile(path.join('index.html'));
// });

module.exports = router;
