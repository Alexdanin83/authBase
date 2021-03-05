const express = require('express');
const router = express.Router();

const isLogged = (req, res, next) => {
  if (!req.user) {
    res.redirect('no-permission');
  } else {
    next();
  }
};

router.get('/logged', isLogged, (req, res) => {
  // przekazujemy do hbs parametry
  res.render('logged', {
    username: req.user._json.given_name,
    picture: req.user._json.picture,
  });
});

router.get('/profile', isLogged, (req, res) => {
  res.render('profile');
});

router.get('/profile/settings', isLogged, (req, res) => {
  res.render('settings');
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/logout', function (req, res) {
  req.logout();
  console.log(req.user);
  res.redirect('/');
});

module.exports = router;
