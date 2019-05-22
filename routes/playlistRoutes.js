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

router.get("/api/playlists/view", async (req, res) => {
  // reach out to database and grab the user's playlists
  const user = await User.findById(req.user._id, err => {
    if (err)
      res
        .status(404)
        .send(err, "There was an error fetching your playlists...");
  }).populate("playlists");
  res.status(200).send(user.playlists);
});

router.post("/api/playlists/new", async (req, res) => {
  let newPlaylist = new Playlist({
    playlistName: req.body.name,
    tracks: [],
    description: req.body.description,
    artwork: req.body.artwork,
    dateCreated: Date.now()
  });
  newPlaylist.save();

  const currentUser = await User.findByIdAndUpdate(req.user._id, {
    $push: { playlists: [newPlaylist] }},
    { new: true }
  ).populate("playlists");
  res.send(currentUser.playlists);
});

// Track Routes

router.put("/api/tracks/view", async (req, res) => {

  const { playlistId } = req.body;
  const playlist = await Playlist.findById(playlistId, err => {
    if (err) res.status(404).send(err, "There was an error fetching your playlists...");
  }).populate("tracks");
  res.status(200).send(playlist);
});

router.post("/api/tracks/new", async (req, res) => {
  // Depending on whether or not its a Spotify, Youtube, or Soundcloud uri will determine how the track's metadata is pulled off and converted into the schema of our Track Model.

  const { source, trackName, spotifyUri, duration, artists } = req.body.track;
  const { playlistId } = req.body;
  const user = req.user;

  switch (source) {
    case "spotify":
      const artistNames = artists.map(artist => artist.name);
      const newTrack = await new Track({
        trackName,
        artistNames,
        albumName: "",
        spotifyUri,
        youtubeUri: "",
        duration,
        bpm: 0,
        source: "spotify", // Spotify, Youtube, Soundcloud, etc.
        playlist: playlistId
      });
      newTrack.save();
      const playlist = await Playlist.findByIdAndUpdate(playlistId, 
        { $push: { tracks: [newTrack] }}, 
        {new: true}
      ).populate("tracks");
      res.status(200).send(playlist);

      break;
    case "Youtube":
      break;
    case "SoundCloud":
      break;
  }

  router.post("/api/tracks/remove", async (req, res) => {
      const { playlistId, track } = req.body;


    const playlist = await Playlist.findByIdAndUpdate(playlistId, 
      { $pull: { tracks: track._id }}, {new: true} 
    ).populate("tracks");

   await Track.findByIdAndDelete(track._id);

    res.status(200).send(playlist);




  });
});

module.exports = router;
