var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {
  console.log("Successful DB Connection.");
});

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  user_level: String,
  email: String,
  age: String,
  ans1: String,
  ans2: String,
  ans3: String
});

var Users = mongoose.model('User_DB', userSchema);

exports.admin = function (req, res) {
  res.render('admin', {
    title: 'Admin Page',
    people: Users
  });
};

exports.index = function (req, res) {
  Users.find(function (err, person) {
    if (err) return console.error(err);
    res.render('index', {
      title: 'Home',
      people: person
    });
  });
};

exports.create = function (req, res) {
  res.render('create', {
    title: 'Add User'
  });
};

exports.createUser = function (req, res) {
  var hashedPass = hashIt(req.body.password);
  var person = new Users({
    username: req.body.username,
    password: hashedPass,
    user_level: req.body.user_level,
    email: req.body.email,
    age: req.body.age,
    ans1: req.body.ans1,
    ans2: req.body.ans2,
    ans3: req.body.ans3
  });
  person.save(function (err, user) {
    if (err) return console.error(err);
    console.log(req.body.username + ' added');
  });
  res.redirect('/');
};

function hashIt(toHash) {
  var hashed;
  bcrypt.hash(hashIt, null, null, function (err, hash) {
    if (err) {
      console.log(err);
      return;
    }
    hashed = hash;
  });
  return hashed;
}

exports.edit = function (req, res) {
  Users.findById(req.params.id, function (err, user) {
    if (err) return console.error(err);
    res.render('edit', {
      title: 'Edit User',
      person: user
    });
  });
};

exports.editUser = function (req, res) {
  Users.findById(req.params.id, function (err, usr) {
    if (err) return console.error(err);
    usr.username = req.body.username;
    usr.password = req.body.password;
    usr.user_level = req.body.user_level;
    usr.email = req.body.email;
    usr.age = req.body.age;
    usr.ans1 = req.body.ans1;
    usr.ans2 = req, body.ans2;
    usr.ans3 = req.body.ans3;
    usr.save(function (err, usr) {
      if (err) return console.error(err);
      console.log(req.body.username + ' updated');
    });
  });
  res.redirect('/');
};

exports.delete = function (req, res) {
  Users.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return console.error(err);
    res.redirect('/');
  });
};

exports.details = function (req, res) {
  Users.findById(req.params.id, function (err, usr) {
    if (err) return console.error(err);
    res.render('details', {
      title: usr.username + "'s Details",
      person: usr
    });
  });
};
