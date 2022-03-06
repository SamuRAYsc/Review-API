require("dotenv").config();
const express = require("express");
const session = require("express-session")
const passport = require("passport");
const bodyParser = require("body-parser")
const cors = require("cors");
var mysql = require("mysql2")
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(session({ secret: process.env.SESSION_SECRET,resave: true, saveUninitialized: true})); 
app.use(passport.initialize());
app.use(passport.session());

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

app.get('/',function(res,req){
    res.send('zdarova');
});


connection.end();