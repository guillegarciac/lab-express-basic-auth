const express = require('express');
const router = require("express").Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');

/* GET sign up view. */
router.get('/xxx', function (req, res, next) { // /xxx is the resource what the user will see in the url when doing this request (aka. /auth/xxx since this is auth route and the entrace door is exported to app.js via app.use('/auth', authRouter);
  res.render('auth/signup'); //view is internal, not the url
});

/* POST sign up */
router.post('/xxx', async function (req, res, next) { 
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