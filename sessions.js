var express = require('express');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());
app.use(expressSession({secret: 'This is my secret', saveUninitialized: true, resave: true}));

app.get('/', function (req, res) {
    req.session.name = req.session.name || new Date().toUTCString();
    console.log(req.sessionID);
    res.send(req.session.name);
});

app.listen(3000);