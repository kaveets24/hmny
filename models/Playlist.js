
const mongoose = require('mongoose');
const trackSchema = require('./Track');
const { Schema } = mongoose;

const playlistSchema = new Schema({
  playlistName: String,
  tracks: [{ type: Schema.Types.ObjectId, ref: 'track' }], // an array of Tracks
  dateCreated: Date,
  description: String,
  artwork: String, //reference to an image url.
  user: { type: Schema.Types.ObjectId, ref: 'user' },
});

mongoose.model('playlist', playlistSchema);