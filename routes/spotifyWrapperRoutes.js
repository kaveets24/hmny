const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const spotifyApi = require('../services/spotifyWebApi');
const mongoose = require('mongoose');
const Track = mongoose.model('tracks');
// const Playlist = require('../models/Playlist');

router.get('/api/findtrack', requireLogin, async (req, res) => {
    const user = req.user;

    spotifyApi.setAccessToken(user.spotifyAccessToken);
    spotifyApi.setRefreshToken(user.spotifyRefreshToken);

    const searchResults = await spotifyApi.searchTracks('artist: Anderson Paak', {limit: 5});

    const tracks = searchResults.body.tracks.items;

    const matchedTrack = tracks[0];
    const newTrack = await new Track({
        trackName: matchedTrack.name,
        artistName: matchedTrack.artists[0].name,
        albumName: 'Single',
        spotifyUri: matchedTrack.uri,
    }).save();



    res.send(matchedTrack);


});

module.exports = router;    