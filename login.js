var express = require('express'),
    expressSession = require('express-session'),
    pug = require('pug'),
    bodyParser = require('body-parser'),
    route = require('./routes/routes.js');
    path = require('path'),
    bcrypt = require('bcrypt-nodejs');

var hash;
var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({extended:true})


function authentication(){
var checkAuth = function (req, res, next) {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// creates session
app.use(expressSession({secret: '5ecretP455c0de', saveUninitialized: true, resave: true}));

app.get('/login', function (req, res) {
    res.render('login');
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// checks to see if user and password are correct
app.post('/', urlencodedParser, function (req, res) {
    console.log(req.body.username);
    //if username is in database
        //hash entered password
        //compare to hashed password in database
        //if res is true,
            //authenticate, 
            //redirect to user page
    //else redirect to logout
    
    //beatty's code (with page name adjustments):
    if (req.body.username == 'user' && req.body.password == 'pass') { 
        req.session.user = { isAuthenticated: true, username: req.body.username}; 
        res.redirect('/userpage');                   
    } else {
        res.redirect('/logout');
    }
});

//landing page
app.get('/', function (req, res) {
   res.send("you've landed.");
});

//check authorization
app.get('/userpage', checkAuth, function (req, res) {
   res.send('Welcome ' + req.session.user.username + '<br><a href="/logout">Logout</a');
});

//logout
app.get('/logout', function (req, res) {
    req.session.destroy(function(err){
        if(err){console.log(err);}
        else {res.redirect('/');}
    });
});
}

authentication();
app.listen(3000);