const express = require('express');

const router = express();

router.get('/', (req, res) => res.redirect('login'));
router.get('/login', (req, res) => res.render('login', {title: 'Login'}));
router.get('/profile', (req, res) => res.render('profile', {
    title: 'Profile',
    user: {
      name: req.user.displayName,
      email: req.user.emails[0].value,
      photo: req.user.photos[0].value
    }
  })
);

module.exports = router;
