
const express = require('express');
const router = express.Router();
const request = require('request')
const querystring = require('querystring')

// Spotify Credentials
const client_id = 'ca729d1f96734b07b1b259e78a7ecf86'; // Your client id
const client_secret = '350fa68a17404632bc6389fa3500d2bb'; // Your secret
const redirect_uri = 'http://localhost:8000/callback'; // Your redirect uri

router.get('/spotifylogin', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

router.get('/callback', function(req, res) {
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
    let uri = 'http://localhost:3000'
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

