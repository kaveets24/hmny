const express = require("express");
const router = express.Router();
const keys = require("../config/keys");

const mongoose = require("mongoose");
const User = mongoose.model("users");
const Playlist = mongoose.model("playlists");


// Create a new playlist
// Should be triggered by a form submit. 
router.get("/new", async (req, res) => {
  let newPlaylist = new Playlist({
    playlistName: "test2",
    tracks: [],
    dateCreated: Date.now()
  });

  newPlaylist.save(err => {
    if (err) console.log(err);
    console.log("A new playlist has been saved!");
  });

  const currentUser = await User.findByIdAndUpdate(req.user._id, {
    $push: { playlists: [newPlaylist] }
  });

  res.send(req.user.playlists);
});

module.exports = router;
