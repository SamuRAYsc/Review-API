const models = require("./models/index.js");
const bcrypt = require("bcryptjs")
const passportLocal = require("passport-local").Strategy;

module.exports = function(passport){
    passport.use(
        new passportLocal(async(username, password, done) => {
            const user = await models.User.findOne( {where: {email: username}})
            console.log('finding started')
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
        console.log('serial')
    })
    passport.deserializeUser(async (id,cb) =>{
        const user = await models.User.findOne({where: {id: id}})
        console.log('deserial')
        if (user)
            cb(null ,user)
    })
}