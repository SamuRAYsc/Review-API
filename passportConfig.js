const models = require("./models/index.js");
const bcrypt = require("bcryptjs")
const passportLocal = require("passport-local").Strategy;

module.exports = function(passport){
    passport.use(
        new passportLocal(async(username, password, done) => {
            const user = await models.User.findOne( {where: {email: username}})
            if(!user) return done(null, false);
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) throw err;
                if (result === true) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            });
        })(req, res, done)
    );
    passport.serializeUser((user,cb) => {
        console.log('ser worked');
        cb(null, user.id);
    })
    passport.deserializeUser(async (id,cb) =>{
        const user = await models.User.findOne({where: {_id: id}})
        console.log('in deser')
        if (user) {
            console.log('found user');
                cb(null, user);
        }
    })
}