const passport = require('passport');
const express = require('express');
const router = express.Router();
const request = require('request')
const querystring = require('querystring')
const keys = require('../config/keys');

// Spotify Credentials
const client_id = keys.spotifyClientID; // Your client id
const client_secret = keys.spotifyClientSecret; // Your secret
// const redirect_uri = (process.env.NODE_ENV === 'production') ? 'https://hmny-prod.heroku.com/callback' : 'http://localhost:8000/callback'

// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
router.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true
  }),
  function(req, res) {
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
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;

