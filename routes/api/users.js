const express = require('express');
const router = express.Router();

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


// @route POST api/users
// @desc Add a user
router.post('/', (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
    const newUser = new User({
      username: req.body.username,
      password: hash
    });
    newUser
    .save()
    .then(user => res.json(user))
    .catch(err => res.status(409).json(err));
});


// @route DELETE api/users
// @desc DELETE a user
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
  .then(user => user.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json(err));
});

module.exports = router;