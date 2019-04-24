
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  spotifyId: String,
  spotifyAccessToken: String,
  spotifyRefreshToken: String,
  playlists: [{ type: Schema.Types.ObjectId, ref: 'playlist' }]
});

mongoose.model('user', userSchema);

