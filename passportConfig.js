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
        })
    );
    passport.serializeUser((user,cb) => {
        cb(null, user.id);

    })
    passport.deserializeUser(async (id,cb) =>{
        const user = await models.User.findOne({where: {id: id}})
        if (user)
            cb(null ,user)
    })
}