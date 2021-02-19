const express = require('express');
const passport = require('passport');

const router = express.Router();

/* 로그아웃 */
router.get('/', function(req, res) {
  console.log('get logout');
  req.logout();
  req.session.save(function() {
    res.redirect('/api/login');
  });
});

module.exports = router;
