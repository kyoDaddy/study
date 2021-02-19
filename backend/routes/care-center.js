var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', function(req, res, next) {

  const options = {
    uri: process.env.PUBLIC_API_BASE_URL + '/PostnatalCare',
    qs: {
       KEY: process.env.PUBLIC_API_KEY
      ,Type: 'json'
      ,pIndex: 1
      ,PSize: 100
    }
  }
  request(options, function(error, response, body){
    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    //console.log('Response received', body);
    return res.json({body});
  });

  //res.render('index', { title: 'Express'});
});

module.exports = router;