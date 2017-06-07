var express = require('express'),
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
  pug = require('pug'),
  path = require('path'),
  route = require('./routes/routes.js'),
  bodyParser = require('body-parser');

var app = express();

app.use(cookieParser());
app.use(expressSession({secret: 'Secrets and stuff', saveUninitialized: true, resave: true}));

// app.get('/', function (req, res) {
//     req.session.name = req.session.name || new Date().toUTCString();
//     console.log(req.sessionID);
//     res.send(req.session.name);
// });

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
  extended: true
})

app.get('/', route.index);
app.get('/create', route.create);
app.get('/edit/:id', route.edit);
app.get('/details/:id', route.details);
app.get('/admin', route.admin);
app.get('/delete/:id', route.delete);
app.get('/login', route.login);
app.post('/', urlencodedParser, route.authenticate)
app.post('/create', urlencodedParser, route.createUser);
app.post('/edit/:id', urlencodedParser, route.editUser);

app.listen(3000);