
const mongoose = require('mongoose');
const trackSchema = require('./Track');
const { Schema } = mongoose;

const playlistSchema = new Schema({
  playlistName: String,
  tracks: [trackSchema], // an array of Tracks
  dateCreated: Date,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('playlists', playlistSchema);