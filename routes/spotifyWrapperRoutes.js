const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const spotifyApi = require("../services/spotifyWebApi");
const mongoose = require("mongoose");
const Track = mongoose.model("track");
// const Playlist = require('../models/Playlist');

router.get("/api/findtrack", requireLogin, async (req, res) => {
  const user = req.user;

  spotifyApi.setAccessToken(user.spotifyAccessToken);
  spotifyApi.setRefreshToken(user.spotifyRefreshToken);

  const searchResults = await spotifyApi.searchTracks("artist: Anderson Paak", {
    limit: 5
  });

  const tracks = searchResults.body.tracks.items;

  const matchedTrack = tracks[0];
  const newTrack = await new Track({
    trackName: matchedTrack.name,
    artistName: matchedTrack.artists[0].name,
    albumName: "Single",
    spotifyUri: matchedTrack.uri
  }).save();

  res.send(matchedTrack);
});

// Should include a regex or pattern matcher for the current playlist, and will begin playback of the first song.
router.get("/api/play", async (req, res) => {
  const user = req.user;
  spotifyApi.setAccessToken(user.spotifyAccessToken);
  spotifyApi.setRefreshToken(user.spotifyRefreshToken);

  const context_uri = req.body.context_uri;

  const play = await spotifyApi.play(context_uri);

  console.log(play);
});

module.exports = router;
