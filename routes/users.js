const express = require('express');
const router = express.Router();
const User = require('../models/User');
const isLoggedIn = require('../middlewares');

/* GET users listing. */
router.get('/profile', isLoggedIn, function (req, res, next) {
  const user = req.session.currentUser;
  res.render('profile', user);
});

/* GET users listing. */
router.get('/profile/edit', isLoggedIn, function (req, res, next) {
  const user = req.session.currentUser;
  res.render('editProfile', user);
});

router.post('/profile/edit', isLoggedIn, async function (req, res, next) {
  const { username } = req.body;
  const user = req.session.currentUser;
  try {
    const userInDB = await User.findByIdAndUpdate(user._id, { username }, { new: true }); //adds validation to make sure is new
    req.session.currentUser = userInDB;
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});

module.exports = router;