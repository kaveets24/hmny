const passport = require('passport');
const express = require('express');
const router = express.Router();

  // router.get(
  //   '/auth/google',
  //   passport.authenticate('google', {
  //     scope: ['profile', 'email']
  //   })
  // );

  // router.get('/auth/google/callback',
  //   passport.authenticate('google'),
  //   (req, res) => res.redirect('/')  
  // );

  router.get('/api/logout', (req, res) => {
    req.logout(); // Takes the cookie which contains our user id, and kills the id that's there.
    res.redirect("/");
  });

  router.get('/api/current_user', (req, res) => {     
     res.send(req.user);
  });

module.exports = router;