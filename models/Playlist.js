
const mongoose = require('mongoose');
const trackSchema = require('./Track');
const { Schema } = mongoose;

const playlistSchema = new Schema({
  playlistName: String,
  dateCreated: Date,
  description: String,
  artwork: String, //reference to an image url.
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  tracks: [{ type: Schema.Types.ObjectId, ref: 'track' }], // an array of Tracks

});

mongoose.model('playlist', playlistSchema);