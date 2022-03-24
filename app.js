require("dotenv").config();
const cors = require("cors");
const express = require("express");
const session = require("express-session")
const passport = require("passport");
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const bodyParser = require("body-parser")
var mysql = require("mysql2");
const models = require("./models/index.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(cors({origin:'http://localhost:3000', credentials:true}))
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

app.listen(process.env.PORT||PORT, function(err){
    if(!err)
        console.log('Server ready');
    else console.log(err);
});

app.post('/',(req,res) => {
    res.send('Server UP');
});

app.post('/login', passport.authenticate("local"), (req, res) =>{
    res.send("succ")
});

app.get('/user', (req, res) =>{
    res.send(req.user)
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