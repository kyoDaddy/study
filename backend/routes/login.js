const express = require('express');
const passport = require('passport');

const router = express.Router();

/* get 요청시, 로그인 중이라면 passport의 deserializeUser() 에서 저장한 req.user의 유저 정보를 보낸다. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated() && req.user) {
    console.log('get login->1');
    return res.json({user: req.user});
  }
  console.log('get  login->2');
  return res.json({user: null});
});


/* post 요청시, local 전략으로 로그인을 시도한다. 이때 사용되는 username과 password는 LocalStrategy에서 설정한 대로 
  req.body.id 와 req.body.password가 된다. 로그인 성공시 user정보를 보내주고, 로그인 실패시 그 이유를 알기위해 info 값을 보내준다.
*/
router.post('/', function(req, res, next) {
  console.log('post->1');
  if(req.isAuthenticated()) {
    return res.redirect('/');
  }
  console.log('post->2');
  /* passport.authenticate()가 반환하는 값은 미들웨어이므로 반드시 뒤에 (req, res, next)를 붙여서 호출해주어야 한다. */
  passport.authenticate('local', (authError, user, info) => {

    console.log('post->3', authError, user, info);
    if(authError) {
      console.error(authError);
      return next(authError);
    }
    if(!user) {
      return res.json(info);
    }
    return req.login(user, (loginError)=> {
      if(loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.json({user});
    });

  })(req, res, next); //미들웨어 호출

});


module.exports = router;
