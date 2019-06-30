
const mongoose = require('mongoose');
const { Schema } = mongoose;

const trackSchema = new Schema({
  trackName: String,
  artistNames: [{type: String}],
  albumName: String,
  spotifyUri: String,
  youtubeUri: String,
  thumbnail: String, // A URL for the Youtube Video thumbnail image
  duration: Number,
  bpm: Number,
  source: String, // Spotify, Youtube, Soundcloud, etc.
  playlist: { type: Schema.Types.ObjectId, ref: 'playlist' }
});

module.exports = trackSchema;
mongoose.model('track', trackSchema);
