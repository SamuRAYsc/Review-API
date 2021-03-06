require("dotenv").config();
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
var mysql = require("mysql2");
const models = require("./models/index.js");
const { sequelize } = require("./models/index.js");

const app = express();
const fileStoreOptions ={
    ttl: 1000 * 60 * 30,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(cors({origin:process.env.CORS_ORIGIN, credentials:true}));

app.use(session({ 
    store: new FileStore(fileStoreOptions),
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true,
    cookie: {
        sameSite: 'none',
        secure : true,
        httpOnly: false,
        maxAge: 1000 * 60 * 30,
    }
})); 
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);
app.set('trust proxy', 1);

var connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
});

app.listen(process.env.PORT||PORT, function(err){
    if(!err)
        console.log('Server ready');
    else console.log(err);
});

app.post('/',(req,res) => {
    res.send('Server UP');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailed',
    }),(req, res) => {res.send(req.sessionID);}
);

app.get('/loginSuccess', (req, res) => {
    req.session.user = req.user;
    req.session.save();
    res.send(req.sessionID);
});
app.get('/loginFailed', (req, res) => {
    res.send('Login Failed! Try again');
});

app.get('/user', (req, res) =>{
    res.send(req.user);
});
app.get('/userlist', async (req, res) =>{
    const List = await models.User.findAll({
        attributes: ['id','email', 'isAdmin']
    });
    res.send(List);
});
app.get('/userreviews', async (req, res) =>{
    const List = await models.Review.findAll({ where:{ author_id: req.user.id },
        attributes: ['id','name', 'updatedAt']
    });
    res.send(List);
});
app.get('/latestReviews', async (req, res) =>{
    const List = await models.Review.findAll({ 
        include: [{
            model: models.User,
            attributes: ['email']
        },
        {
            model: models.Creation,
            attributes: ['name']
        }],
        order: [ ['updatedAt', "DESC"] ],
        limit: 3,
        attributes: ['id','name', 'description', 'updatedAt' ]
    });
    res.send(List);
});

app.get('/bestReviews', async (req, res) =>{
    res.send('123');
});

app.get('/logout', (req, res) =>{
    req.logout();
    res.send("succ");
});

app.post('/register',async (req,res) => {
    const [user, created] = await models.User.findOrCreate({
        where:{
            email: req.body.username,
        },
        defaults:{
            password: await bcrypt.hash(req.body.password, 10)
        }
    });
    if (created) {
        res.send('good job!')
    } else{
        res.send('smth broke in creation')
    }
});

connection.end();