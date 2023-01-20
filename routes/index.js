const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.session.currentUser;
  res.render("index", { title: 'Something', user });
});

module.exports = router;
