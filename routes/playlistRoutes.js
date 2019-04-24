const express = require("express");
const router = express.Router();
const keys = require("../config/keys");

const mongoose = require("mongoose");
const User = mongoose.model("user");
const Playlist = mongoose.model("playlist");


// Create a new playlist
// Should be triggered by a form submit. 

router.get('/playlists/view', async (req, res) => {
  // reach out to database and grab the user's playlists
    const user = await User.findById(req.user._id, (err) => {
      if (err) res.send(err, "There was an error fetching your playlists...")
    }).populate('playlists');
    res.send(user);
});

router.post("/playlists/new", async (req, res) => {
  let newPlaylist = new Playlist({
    playlistName: req.body.name,
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
  res.send()
});



module.exports = router;
