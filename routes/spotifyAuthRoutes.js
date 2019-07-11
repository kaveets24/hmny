const passport = require('passport');
const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const request = require('request');
const mongoose = require("mongoose");
var User = mongoose.model("user");



// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
router.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ["streaming", "user-read-birthdate", "user-read-email", "user-read-private"],
    showDialog: true
  }),
  function (req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  }
);

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  }
);

router.get('/auth/refresh_token', function (req, res) {
  // requesting access token from refresh token
  var refreshToken = req.user.spotifyRefreshToken;
  var spotifyId = req.user.spotifyId;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(keys.spotifyClientID + ':' + keys.spotifyClientSecret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var accessToken = body.access_token;

        User.findOneAndUpdate(
          { spotifyId: spotifyId },
          { $set: { spotifyAccessToken: accessToken, spotifyRefreshToken: refreshToken } },
          { new: true },
          (err, user) => {
            if (err) return err;
            req.logout();
            req.login(user, function(err) {
              if (err) return;
              return res.send(user);
            });
                      
          });



    }
  });

  router.get('/api/logout', (req, res) => {
    req.logout(); // Takes the cookie which contains our user id, and kills the id that's there.
    res.redirect("/");
  });
});

module.exports = router;

