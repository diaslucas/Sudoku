const express = require('express');
const router = express.Router();

const passport = require('passport');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// User Model
const User = require('../../models/User');

// @route GET api/users
// @desc Get all users
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
});

// @route GET api/users/:id
// @desc Get a user
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
});

// @route POST api/users/userLoggedIn
// @desc Checks if user is logged in
router.post('/userLoggedIn', (req, res) => {
  if(req.isAuthenticated()){
    res.json({ success: true, user: req.user });
  } else {
    res.json({ success: false, message: 'No user logged in' });
  }
});


// @route POST api/users/login
// @desc Log user in
router.post('/login', (req, res) => {
  if (!req.isAuthenticated()) {
    User.findOne({ username: req.body.username }, (err, user) => {
      const errorMessage = 'Username or Password is wrong';
      if (err) {
        res.status(500).json({ success: false, message: errorMessage });
      } else {
        if (user !== null) {
          let passwordMatch = bcrypt.compareSync(req.body.password, user.password);
          if (passwordMatch) {
            req.login(user._id, function(err) {
              const treatedUser = {id: user._id, username: user.username, role: user.role};
              res.json({ success: true, user: treatedUser });
            });
          } else {
            res.status(500).json({ success: false, message: errorMessage })
          }
        } else {
          res.status(500).json({ success: false, message: errorMessage });
        }
      }
    })
  } else {
    res.json({ success: false, message: 'There is a user logged in already' });
  }
});


// @route POST api/users
// @desc Add a user
router.post('/', (req, res) => {
  if (!req.isAuthenticated()) {
    const { username, password, passwordConfirmation } = req.body;
    let alert = [];
    if (username === '') {
      alert.push("Username is required!");
    } else {
      if (username.length <= 4) {
        alert.push("Username is too short!");
      }
    }
    if (password === '') {
      alert.push("Password is required!");
    } else {
      if (password.length <= 4) {
        alert.push("Password is too short!");
      } else {
        if (password !== passwordConfirmation) {
          alert.push("Password doesn't match with confirmation!");
        }
      }
    }

    if (alert.length > 0) {
      res.json({ success: false, message: alert });
    } else {
      const hash = bcrypt.hashSync(req.body.password, saltRounds);
      const newUser = new User({
        username: req.body.username,
        password: hash,
        role: 'user'
      });
      newUser
        .save()
        .then(user => {
          req.login(user._id, function (err) {
            const treatedUser = {id: user._id, username: user.username, role: user.role};
            res.json({ success: true, user: treatedUser });
          });
        })
        .catch(err => {
          if (err.code === 11000) { //duplicate record
            alert.push('The username already exists!')
            res.json({ success: false, message: alert });
          } else {
            res.json({ success: false, message: ['Sorry! Something went wrong'] });
          }
        })
    }
  } else {
    res.json({ success: false, message: 'There is a user logged in already' });
  }
});

// @route POST api/users/logout
// @desc Logs a user out
router.post('/logout', (req, res) => {
  if(req.isAuthenticated()){
    req.logout();
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'No user logged in' });
  }
});

// @route DELETE api/users
// @desc DELETE a user
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
  .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json(err));
  });
  
  passport.serializeUser(function (userID, done) {
    done(null, userID);
  });
  
  passport.deserializeUser(function (userID, done) {
    User.findById(userID, function (err, user) {
      let treatedUser = user;
      if(user !== null){
        treatedUser = {id: user._id, username: user.username, role: user.role};
      }
      done(err, treatedUser);
    });
  });


  module.exports = router;