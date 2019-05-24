const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const spotifyApi = require("../services/spotifyWebApi");
const mongoose = require("mongoose");
const Track = mongoose.model("track");
const search = require("youtube-search");
const keys = require('../config/keys');

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


  case "youtube":
    var opts = {
      maxResults: 10,
      key: keys.googleApiKey
    };
     
    search(inputText, opts, (err, results) => {
      if(err) console.log(err);
      console.dir(results);
    });
    return

  default:
    return;

}


});

router.put("/api/play", async (req, res) => {
  const user = req.user;
  const { context_uri, position_ms } = req.body;

  spotifyApi.setAccessToken(user.spotifyAccessToken);
  spotifyApi.setRefreshToken(user.spotifyRefreshToken);

  await spotifyApi.play({ uris: [context_uri], position_ms: position_ms });
  res.status(200).send();
});

router.get("/api/pause", async (req, res) => {
  const user = req.user;
  spotifyApi.setAccessToken(user.spotifyAccessToken);
  spotifyApi.setRefreshToken(user.spotifyRefreshToken);

  await spotifyApi.pause();
  res.status(200).send();
});

module.exports = router;
