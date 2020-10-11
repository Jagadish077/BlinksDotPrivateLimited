const express = require('express')
const http = require('http');
const https = require('https');
const hbs = require('express-handlebars')
const fs = require('fs')

const app = express()


// Imports
const covidData = require('./Routes/covid19')

app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main'
}));

app.use('/static', express.static('static'))

var https_options = {
    ca: fs.readFileSync("./sll/www_blinksdot_com.ca-bundle"),
    key: fs.readFileSync("./sll/PrivateKey.key"),
    cert: fs.readFileSync("./sll/www_blinksdot_com.crt"),
    p7b: fs.readFileSync("./sll/www_blinksdot_com.p7b")
   };

   const hostname = 'www.blinksdot.com';
   app.use((req, res, next) => {
       if(req.protocol === 'http'){
           res.redirect(301, `https://${hostname}${req.headers.host}`);
       }
       next();
   })

app.use('/', covidData)


http.createServer(app).listen(80, ()=> console.log("server is insecure"))
https.createServer(https_options, app).listen(443, () => console.log("server is secure"))

