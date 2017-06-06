var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  myObj = {};
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
  Users.find(function (err, person) {
    if (err) return console.error(err);
    res.render('admin', {
      title: 'Admin Page',
      people: person
    });
  });
};

exports.authenticate = function (req, res) {
  var userId;
  Users.findOne({ username: req.body.username }, function (err, person) {
    userId = person._id;
    if (userId) {
      checkPass(userId, req.body.password, res);
    } else {
      res.render('login', {
        errorMsg: 'That username does not exist.'
      });
    }
  });
};

function checkPass(id, password, response) {
  var authentic = false,
    dbPass;
  Users.findById(id, function (err, person) {
    dbPass = person.password;
    bcrypt.compare(password, dbPass, function (err, res) {
      if (err) return console.error(err);
      if (!res) {
        response.render('login', {
          errorMsg: 'That password is incorrect.'
        });
      } else {
        console.log(person.username + ' has logged in.');
        if (person.user_level === "admin") {
          response.redirect('/admin');
        } else {
          response.redirect('/details/' + id);
        }
      }
    });
  });
}

exports.index = function (req, res) {
  res.render('index', {
    title: 'Home'
  });
};

exports.create = function (req, res) {
  res.render('create', {
    title: 'Add User'
  });
};

exports.createUser = function (req, res) {
  console.log(req.body.password);
  var person = new Users({
    username: req.body.username,
    password: "",
    user_level: req.body.user_level,
    email: req.body.email,
    age: req.body.age,
    ans1: req.body.ans1,
    ans2: req.body.ans2,
    ans3: req.body.ans3
  });
  hashNSave(req.body.password, person);
  res.redirect('/');
};

function saveUser(person) {
  person.save(function (err, user) {
    if (err != undefined) { console.log(err); return; }
    console.log(person.username + ' added, password ' + person.password);
  });
}

function hashNSave(toHash, person) {
  bcrypt.hash(toHash, null, null, function (err, hash) {
    person.password = hash;
    saveUser(person);
  });
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
  Users.findById(req.params.id, function (err, user) {
    if (err) return console.error(err);
    user.username = req.body.username;
    user.password = req.body.password;
    user.user_level = req.body.user_level;
    user.email = req.body.email;
    user.age = req.body.age;
    user.ans1 = req.body.ans1;
    user.ans2 = req, body.ans2;
    user.ans3 = req.body.ans3;
    user.save(function (err, usr) {
      if (err) return console.error(err);
      console.log(req.body.username + ' updated');
    });
  });
  res.redirect('/');
};

exports.delete = function (req, res) {
  Users.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return console.error(err);
    res.redirect('/admin');
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

exports.login = function (req, res) {
  res.render('login', {

  });
};

// admin and user creation