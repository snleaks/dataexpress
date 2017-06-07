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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(){
    var user = getCookie("username");

    if(user != ""){
        console.log("Welcome, " + user);
    }
    else {
        setCookie("username", user, 365);
    }
}

checkCookie();

app.listen(3000);