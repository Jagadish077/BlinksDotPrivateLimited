const express = require('express')
const http = require('http');
const https = require('https');
const hbs = require('express-handlebars')
const fs = require('fs')

const app = express()


// Imports
const covidData = require('./Routes/covid19')
const Home = require('./Routes/Home')

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


app.use(`/`, covidData)
app.use(`/`, Home)

const serverHttpsPort = 443
const serverHttpPort = 80
// const port = 80 || process.env.PORT
http.createServer(app, (req, res)=> {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    console.log("redirected")
    res.end();
}).listen(serverHttpPort, () => console.log("redirect"))
https.createServer(https_options, app).listen(serverHttpsPort, () => console.log("server is secure"))

