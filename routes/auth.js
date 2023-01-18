const express = require('express');
const router = require("express").Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');

/* GET sign up view. */
router.get('/signup', function (req, res, next) {
  res.render('auth/signup');
});

/* POST sign up */
router.post('/signup', async function (req, res, next) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.render('auth/signup', { error: 'All fields are necessary.' });
    return;
  }
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.render('auth/signup', { error: 'Password needs to contain at least 6 characters, one number, one lowercase and one uppercase letter.' });
    return;
  }
  try {
    const userInDB = await User.findOne({ email: email });
    if (userInDB) {
      res.render('auth/signup', { error: `There already is a user with email ${email}` });
      return;
    } else {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({ username, email, hashedPassword });
      res.render('auth/profile', user);
    }
  } catch (error) {
    next(error)
  }
});

module.exports = router;