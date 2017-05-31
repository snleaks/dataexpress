var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser('This is my passphrase'));

app.get('/', function (req, res) {
    if(req.cookies.beenHereBefore === 'yes') {
        res.send('You are logged in.');
    } else {
        res.cookie('beenHereBefore', 'yes');
        res.send('You need to log in.');
    }
    
});

app.get('/clear', function (req, res) {
    res.clearCookie('beenHereBefore');
    res.redirect('/');
});

app.listen(3000);