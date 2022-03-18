const models = require("./models/index.js");
const bcrypt = require("bcryptjs")
const passportLocal = require("passport-local").Strategy;

module.exports = function(passport){
    passport.use(
        new passportLocal((username, password, done) => {
            models.User.findOne( {where: {email: username}} ,(err, user) =>{
                if(err) throw err;
                if(!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) throw err;
                    if (result === true) {
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                });
            });
        })
    );
    passport.serializeUser((user,cb) => {
        cb(null, user.id);
    })
    passport.deserializeUser((id,cb) =>{
        models.User.findOne({where: {id: id}}, (err,user) => {
            cb(err,user)
        })
    })
}