const express = require('express');
const passport = require('passport');

const router = express();

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/login' ,
  })
);

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }

    req.session.destroy();
    res.redirect('/login');
  });
})

module.exports = router;
