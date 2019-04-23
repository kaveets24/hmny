const express = require("express");
const router = express.Router();
const keys = require("../config/keys");

const mongoose = require("mongoose");
const User = mongoose.model("users");
const Playlist = mongoose.model("playlists");


// Create a new playlist
// Should be triggered by a form submit. 

router.get('/playlists', async (req, res) => {
  console.log("Route hit");
  // reach out to database and grab the user's playlists
    const user = await User.findById(req.user._id, (err) => {
      if (err) res.send(err, "There was an error fetching your playlists...")
    });

    res.send(user);
});

router.get("/playlists/new", async (req, res) => {
  let newPlaylist = new Playlist({
    playlistName: "test3",
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

  res.redirect('/playlists');
});


module.exports = router;
