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


// @route POST api/users/login
// @desc Get a token if username and password match
router.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    const errorMessage = 'Username or Password is wrong';
    if (err) {
      res.status(500).json({success: false, message: errorMessage});
    } else {
      if (user !== null){
        let passwordMatch = bcrypt.compareSync(req.body.password, user.password);
        if(passwordMatch){
          res.json({success: true, token: user._id, username: user.username});
        } else {
          res.status(500).json({success: false, message: errorMessage})
        }
      } else {
        res.status(500).json({success: false, message: errorMessage});
      }
    }
  })
});


// @route POST api/users
// @desc Add a user
router.post('/', (req, res) => {
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
      if (password !== passwordConfirmation){
        alert.push("Password doesn't match with confirmation!");
      }
    }
  }
  
  if (alert.length > 0) {
    res.json({success: false, message: alert});    
  } else {
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
      const newUser = new User({
        username: req.body.username,
        password: hash
      });
      newUser
      .save()
      .then(user => {
        req.login(user._id, function(err) {
          res.json({ success: true, user });
        });
      })
      .catch(err => {
        if(err.code === 11000){ //duplicate record
          alert.push('The username already exists!')
          res.json({success: false, message: alert});    
        } else {
          res.json({success: false, message: ['Sorry! Something went wrong']});
        }
      })
  }
});

passport.serializeUser(function(userID, done) {
  done(null, userID);
});

passport.deserializeUser(function(userID, done) {
  User.findById(userID, function (err, user) {
    done(err, user._id);
  });
});


// @route DELETE api/users
// @desc DELETE a user
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
  .then(user => user.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json(err));
});

module.exports = router;