const LocalStrategy = require('passport-local').Strategy;
const users = require('../data/users.json');

exports.config = (passport) => {
    //로그인을 하면 user  정보를 세션에 저장하기 위해 호출된다.
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    //매 요청시 호출되면서 세션에 저장된 정보(id)를 불러온다. 그 id에 해당하는 user를 찾아서 done()에 넣어주면 req.user에 유저 정보가 저장된다.
    passport.deserializeUser((id, done) => {
        const result = users.filter((user)=> user.id === id);
        if(result.length>0) {
            done(null, result[0]);
        }
    });

    // usernameField/passwordField req.body에서 값을 읽어온다.
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
    },(id, password, done) => {
        const result = users.filter((user)=> user.id === id);
        if(result.length>0) {
            const user = result[0];
            if(password === user.password) {
                done(null, user);
            } else {
                done(null, false, {message: "비밀번호 틀림"});
            }
        }
        else {
            done(null, false, {message: "가입되지 않은 회원"})
        }
    }));

};