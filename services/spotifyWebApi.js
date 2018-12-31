const SpotifyWebApi = require("spotify-web-api-node");
const keys = require("../config/keys");


const spotifyApi = new SpotifyWebApi({
    clientId: keys.spotifyClientID,
    clientSecret: keys.spotifyClientSecret,
    redirectUri: new URL("/callback", keys.rootUrl).href
  });


  module.exports = spotifyApi;
