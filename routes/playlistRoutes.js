const express = require("express");
const router = express.Router();
const keys = require("../config/keys");

const mongoose = require("mongoose");
const User = mongoose.model("user");
const Playlist = mongoose.model("playlist");
const Track = mongoose.model("track");
const spotifyApi = require("../services/spotifyWebApi");

// Create a new playlist
// Should be triggered by a form submit.

router.get("/playlists/view", async (req, res) => {
  // reach out to database and grab the user's playlists
  const user = await User.findById(req.user._id, err => {
    if (err) res.send(err, "There was an error fetching your playlists...");
  }).populate("playlists");
  res.send(user.playlists);
});

router.post("/playlists/new", async (req, res) => {
  let newPlaylist = new Playlist({
    playlistName: req.body.name,
    tracks: [],
    description: req.body.description,
    artwork: req.body.artwork,
    dateCreated: Date.now()
  });
  newPlaylist.save();

  const currentUser = await User.findByIdAndUpdate(req.user._id, {
    $push: { playlists: [newPlaylist] }
  });
  res.send();
});

// Track Routes

router.get("/tracks/view", async (req, res) => {
  const playlist = await Playlist.findById("5cc29767cba2cb0955e3cc7f", err => {
    if (err) res.send(err, "There was an error fetching your playlists...");
  }).populate("tracks");
  res.send(playlist.tracks);
});
// Will be a post request
router.get("/tracks/new", async (req, res) => {
  //  Placeholder code
  const user = req.user;
  console.log("Route hit");

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
  })
  newTrack.save();

  const playlist = await Playlist.findByIdAndUpdate(
    "5cc29767cba2cb0955e3cc7f",
    {
      $push: { tracks: [newTrack] }
    }
  );

  res.send();
});



module.exports = router;
