var express = require('express');

var app = express();

var globalInterceptor = function (req, res, next) {
    console.log('(Global) Path requested is %s', req.path);
    next();
};

var singleInterceptor = function (req, res, next) {
    console.log('(Single) Path requested is %s', req.path);
    console.log('single interceptor called');
    next();
};

app.use(globalInterceptor);

app.get('/', function (req, res) {
    res.send('Default is called');
});

app.get('/other', singleInterceptor, function (req, res) {
    res.send('Other is called');
});

app.listen(3000);