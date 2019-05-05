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
    $push: { playlists: [newPlaylist] }
  });
  res.send();
});

// Track Routes

router.put("/api/tracks/view", async (req, res) => {

  const { playlistId } = req.body;
  const playlist = await Playlist.findById(playlistId, err => {
    if (err) res.status(404).send(err, "There was an error fetching your playlists...");
  }).populate("tracks");
  res.send(playlist.tracks);
});
// Will be a post request
router.post("/api/tracks/new", async (req, res) => {
  //  Placeholder code
  // will need access to this.props.playlists.current & the track metadata.
  // Depending on whether or not its a Spotify, Youtube, or Soundcloud uri will determine how the track's metadata is pulled off and converted into the schema of our Track Model.

  const { source, trackName, spotifyUri, duration, artists } = req.body.track;
  const { playlistId } = req.body;
  const user = req.user;

  switch (source) {
    case "Spotify":
      const artistNames = artists.map(artist => artist.name);
      const newTrack = await new Track({
        trackName,
        artistNames,
        albumName: "",
        spotifyUri,
        youtubeUri: "",
        duration: duration,
        bpm: 0,
        source: "", // Spotify, Youtube, Soundcloud, etc.
        playlist: playlistId
      });
      newTrack.save();
      const playlist = await Playlist.findByIdAndUpdate(playlistId, {
        $push: { tracks: [newTrack] }
      });

      res.status(200).send(playlist);

      break;
    case "Youtube":
      break;
    case "SoundCloud":
      break;
  }
});

module.exports = router;
