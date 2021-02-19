var express = require('express');
var router = express.Router();
var path = require('path'); //모듈 추가

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.sendFile(path.join(__dirname, '../public/index.html')); //Vue로 빌드된 html 전송
});

module.exports = router;
