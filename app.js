require("dotenv").config();
const express = require("express");
const session = require("express-session")
const passport = require("passport");
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")
const cors = require("cors");
var mysql = require("mysql2");
const models = require("./models/index.js");
const passportLocal = require("passport-local").Strategy;

const app = express();

app.use(cors({origin:'http://localhost:3000', credentials:true}))
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(session({ secret: process.env.SESSION_SECRET,resave: true, saveUninitialized: true})); 
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);


var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'reviewdb',
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
});

connection.query('SELECT 1 + 1 AS output', function(err, rows, fields){
    if(err) throw err;
    console.log('result -> ', rows[0].output ,'\n','fields -> ', fields )
});

app.listen(8080, function(err){
    if(!err)
        console.log('Server ready');
    else console.log(err);
});

app.post('/',(req,res) => {
    res.send('Server UP');
});

app.post('/login', (req,res, next) => {
    passport.authenticate("local", (err, user, info) =>{
        if (err) throw err;
        if(!user) res.send(false);
        else{
            req.logIn(user, err=> {
                if (err) throw err;
                res.send(user);
                console.log(req.user);
            });
        }
    })(req,res,next);
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
app.get('/user',(req,res) => {
    res.send('zdarova user');
});


connection.end();