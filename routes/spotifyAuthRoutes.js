
var client_id = 'ca729d1f96734b07b1b259e78a7ecf86'; // Your client id
var client_secret = '350fa68a17404632bc6389fa3500d2bb'; // Your secret
var redirect_uri = 'http://localhost:8000/callback'; // Your redirect uri


let request = require('request')
let querystring = require('querystring')


module.exports = app => {
  app.get('/spotifylogin', function(req, res) {
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id,
        scope: 'user-read-private user-read-email',
        redirect_uri
      }))
  })
  
  app.get('/callback', function(req, res) {
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
    })
  })
  
}
