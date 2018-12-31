
const mongoose = require('mongoose');
const { Schema } = mongoose;

const trackSchema = new Schema({
  trackName: String,
  artistName: String,
  albumName: String,
  spotifyUri: String,
  youtubeUri: String,
  bpm: Number,
  source: String // Spotify, Youtube, Soundcloud, etc.
});

module.exports = trackSchema;
mongoose.model('tracks', trackSchema);
