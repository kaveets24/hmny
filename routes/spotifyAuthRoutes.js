const passport = require('passport');
const express = require('express');
const router = express.Router();
const request = require('request')
const querystring = require('querystring')
const keys = require('../config/keys');

// Spotify Credentials
const client_id = keys.spotifyClientID; // Your client id
const client_secret = keys.spotifyClientSecret; // Your secret
const redirect_uri = (process.env.NODE_ENV === 'production') ? 'https://hmny-prod.herokuapp.com/callback' : 'http://localhost:8000/callback'

router.get('/spotifylogin', passport.authenticate('spotify'), function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

// NEED TO FIGURE OUT WHY THIS IS NOT AUTHENTICATING
router.get('/callback', passport.authenticate('spotify'),  function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        client_id + ':' + client_secret
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = (process.env.NODE_ENV === 'production') ? 'https://hmny-prod.herokuapp.com' : 'http://localhost:3000';
    res.redirect(uri + '?access_token=' + access_token)

    var options = {
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };

    request.get(options, function(error, response, body) {
      console.log(body);
    });
  })


})

module.exports = router;

