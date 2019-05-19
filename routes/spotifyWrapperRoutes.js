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
    limit: 30
  });
  const tracks = searchResults.body.tracks.items;

  res.status(200).send(tracks);
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
