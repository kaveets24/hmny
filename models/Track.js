
const mongoose = require('mongoose');
const { Schema } = mongoose;

const trackSchema = new Schema({
  trackName: String,
  artistName: String,
  albumName: String,
  spotifyUri: String,
  youtubeUri: String,
  duration: Number,
  bpm: Number,
  source: String, // Spotify, Youtube, Soundcloud, etc.
  playlist: { type: Schema.Types.ObjectId, ref: 'playlist' }
});

module.exports = trackSchema;
mongoose.model('track', trackSchema);
