// const express = require("express");
// const router = express.Router();

// const mongoose = require("mongoose");
// const Playlist = mongoose.model("playlist");
// const Track = mongoose.model("track");
// const spotifyApi = require("../services/spotifyWebApi");


// // Track Routes

// router.get("/api/tracks/view", async (req, res) => {
//     const playlist = await Playlist.findById("5cc29767cba2cb0955e3cc7f", err => {
//       if (err) res.send(err, "There was an error fetching your playlists...");
//     }).populate("tracks");
//     res.send(playlist.tracks);
//   });
//   // Will be a post request
//   router.get("/api/tracks/new", async (req, res) => {
//     //  Placeholder code
//     const user = req.user;
//     console.log("Route hit");
  
//     spotifyApi.setAccessToken(user.spotifyAccessToken);
//     spotifyApi.setRefreshToken(user.spotifyRefreshToken);
  
//     const searchResults = await spotifyApi.searchTracks("artist: Anderson Paak", {
//       limit: 5
//     });
  
//     const tracks = searchResults.body.tracks.items;
  
//     const matchedTrack = tracks[0];
//     const newTrack = await new Track({
//       trackName: matchedTrack.name,
//       artistName: matchedTrack.artists[0].name,
//       albumName: "Single",
//       spotifyUri: matchedTrack.uri
//     })
//     newTrack.save();
  
//     const playlist = await Playlist.findByIdAndUpdate(
//       "5cc29767cba2cb0955e3cc7f",
//       {
//         $push: { tracks: [newTrack] }
//       }
//     );
  
//     res.send();
//   });

//   module.exports = router;