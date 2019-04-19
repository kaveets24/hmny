
const mongoose = require('mongoose');
const { Schema } = mongoose;
const playlistSchema = require('./Playlist');

const userSchema = new Schema({
  googleId: String,
  spotifyId: String,
  spotifyAccessToken: String,
  spotifyRefreshToken: String,
  playlists: [playlistSchema]
});

mongoose.model('users', userSchema);

