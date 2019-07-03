const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const spotifyApi = require("../services/spotifyWebApi");
const mongoose = require("mongoose");
const Track = mongoose.model("track");
const search = require("youtube-search");
const keys = require('../config/keys');
const axios = require("axios");
const queryString = require("query-string");

router.put("/api/findtrack", requireLogin, async (req, res) => {
  const user = req.user;
  const { inputText, source } = req.body.query;
switch (source) {
  case "spotify":
    spotifyApi.setAccessToken(user.spotifyAccessToken);
    spotifyApi.setRefreshToken(user.spotifyRefreshToken);

    const searchResults = await spotifyApi.searchTracks(inputText, {
      limit: 30
    });
    
    const tracks = searchResults.body.tracks.items;

    res.status(200).send(tracks);
    break;


  case "youtube":

  // Old Code
    var opts = {
      maxResults: 5,
      type: ["video"],
      key: keys.googleApiKey
    };
     
    search(inputText, opts, (err, results) => {
      if(err) console.log(err);
        console.log(results);
        res.status(200).send(results);
    });
    break;

  default:
    break;

}


});

router.put("/api/play", async (req, res) => {
  const user = req.user;
  const { spotifyUri, position_ms, source } = req.body;

  switch (source) {
    case "spotify":
      spotifyApi.setAccessToken(user.spotifyAccessToken);
      spotifyApi.setRefreshToken(user.spotifyRefreshToken);

      await spotifyApi.play({ uris: [spotifyUri], position_ms: position_ms });
      res.status(200).send();
      break;

    case "youtube":
      
      // Play youtube video.
      res.status(200).send();
      break;
  }
});

router.get("/api/pause", async (req, res) => {
  const user = req.user;

      spotifyApi.setAccessToken(user.spotifyAccessToken);
      spotifyApi.setRefreshToken(user.spotifyRefreshToken);

      await spotifyApi.pause();
      res.status(200).send();

});

module.exports = router;
