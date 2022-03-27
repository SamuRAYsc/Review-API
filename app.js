require("dotenv").config();
const cors = require("cors");
const express = require("express");
// const session = require("cookie-session");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
var mysql = require("mysql2");
const models = require("./models/index.js");

const app = express();
const fileStoreOptions ={
    ttl: 1000 * 60 * 30,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
// app.use(cors());
app.use(cors({origin:'https://luminous-belekoy-e89225.netlify.app', credentials:true}));

app.set('trust proxy', 1)
app.use(session({ 
    store: new FileStore(fileStoreOptions),
    secret: "testing secret 123", 
    resave: false, 
    saveUninitialized: true,
    cookie: {
        secure : true,
        httpOnly: false,
        maxAge: 1000 * 60 * 30,
    }
})); 
// app.use(session({ name: 'session', secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true, cookie: { secure: true }})); 
app.use(cookieParser("testing secret 123"))
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

var connection = mysql.createConnection({
    host:'spryrr1myu6oalwl.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    user:'v5r6zaqjfnivzo71',
    password:'z8qhz8nog4lxa1ib',
    database:'lpegx2q2qvlr7sgs',
});
//mysql://b241a15460b450:52a0f87b@eu-cdbr-west-02.cleardb.net/heroku_4da2a7f96e284d0?reconnect=true
//mysql://v5r6zaqjfnivzo71:z8qhz8nog4lxa1ib@spryrr1myu6oalwl.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/lpegx2q2qvlr7sgs

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
    })
);
app.get('/loginSuccess', (req, res) => {
    res.send(req);
});
app.get('/loginFailed', (req, res) => {
    res.send(err);
});

app.get('/user', (req, res) =>{
    res.send(req.user);
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