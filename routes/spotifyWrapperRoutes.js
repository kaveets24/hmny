const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const spotifyApi = require("../services/spotifyWebApi");
const mongoose = require("mongoose");
const Track = mongoose.model("track");
// const Playlist = require('../models/Playlist');

router.put("/api/findtrack", requireLogin, async (req, res) => {
  const user = req.user;
  const query = req.body.query;

  spotifyApi.setAccessToken(user.spotifyAccessToken);
  spotifyApi.setRefreshToken(user.spotifyRefreshToken);

  const searchResults = await spotifyApi.searchTracks(query, {
    limit: 1
  });
  const tracks = searchResults.body.tracks.items;

  // const newTrack = await new Track({
  //   trackName: matchedTrack.name,
  //   artistName: matchedTrack.artists[0].name,
  //   albumName: "Single",
  //   spotifyUri: matchedTrack.uri
  // }).save();
 console.log(tracks);
  res.status(200).send(tracks);
});

router.get("/api/play", async (req, res) => {
  const user = req.user;
  spotifyApi.setAccessToken(user.spotifyAccessToken);
  spotifyApi.setRefreshToken(user.spotifyRefreshToken);

  // Leave commented out until req.body contains a property "context_uri"
  // const context_uri = req.body.context_uri;
  // It will look like this.
  const context_uri = { context_uri: "spotify:album:5oSVYKZLKGCmwYqmJ7AZnO" };

  const play = await spotifyApi.play(context_uri);
  res.send();
});

module.exports = router;
