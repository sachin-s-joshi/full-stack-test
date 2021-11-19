const express = require('express')
const bodyParser = require('body-parser')
var app = express();

var exchange = require('./exchange');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/exchange', exchange)


app.listen(4000, console.log('App is running..'));