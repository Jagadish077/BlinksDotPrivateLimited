const express = require('express')
const http = require('http');
const https = require('https');
const hbs = require('express-handlebars')
const fs = require('fs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const UserSchema = require('./config/DbConnection')
const User = mongoose.model('User', UserSchema)
const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// sessions
app.use(session({
    secret: 'Qwerty@123Qwerty@123blinksdotprivatelimited',
    saveUninitialized: false,
    resave: false
}))

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

// Imports
const covidData = require('./Routes/covid19')
const Home = require('./Routes/Home')

app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'mainHome'
}));

app.use('/static', express.static('static'))

var https_options = {
    ca: fs.readFileSync("./sll/www_blinksdot_com.ca-bundle"),
    key: fs.readFileSync("./sll/PrivateKey.key"),
    cert: fs.readFileSync("./sll/www_blinksdot_com.crt"),
    p7b: fs.readFileSync("./sll/www_blinksdot_com.p7b")
   };


app.use(`/`, covidData)
app.use(`/`, Home)

const serverHttpsPort = 443
const serverHttpPort = 80

http.createServer(app).listen(serverHttpPort, () => console.log("redirect"))
https.createServer(https_options, app).listen(serverHttpsPort, () => console.log("server is secure"))


